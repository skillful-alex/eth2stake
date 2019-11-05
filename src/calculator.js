// https://github.com/ethereum/eth2.0-specs/blob/dev/specs/core/0_beacon-chain.md#rewards-and-penalties
// https://github.com/prysmaticlabs/prysm/beacon-chain/core/state/transition.go
const BASE_REWARD_FACTOR = 64;
const BASE_REWARDS_PER_EPOCH = 4;
const ΞVALIDATOR_DEPOSIT = 32;
const GWEI_PER_ETH = 1000000000;

function ValidatorReward(total_balance, totalUptime, myUptime) {
  let base_reward = ΞVALIDATOR_DEPOSIT * BASE_REWARD_FACTOR / Math.sqrt(total_balance*GWEI_PER_ETH) / BASE_REWARDS_PER_EPOCH;
  // Process reward/penalty attestation of source, target, heard + crosslink
  let Ξrewards   = 4 * base_reward * totalUptime;
  let Ξpenalties = 4 * base_reward;

  return myUptime*Ξrewards - (1-myUptime)*Ξpenalties;
}

const SEC_PER_SLOT = 6;
const SLOTS_PER_EPOCH = 64;
const EPOCH_PER_YEAR = 365*24*60*60/(SLOTS_PER_EPOCH*SEC_PER_SLOT);

const initialState = {
    $Invest: 100000,
    $ETHPrice: 185,
    ΞTotalETHStaked: 10000000,
    $HardwareCost: 200*3,             // beacon+validator+hotreserve
    yearHardwareFullDepreciation: 4,
    $ISPCostPerMonth: 20,
    $ElectricityCostPerMonthPerValidator: 10/64,
    validatorUptime: 0.99,
    totalUptime: 0.99,
}

function FormatLog(varName, value, unit) {
    unit = unit||"";
    value = Math.round(value*100)/100;
    return varName +"="+ value + unit+"\n";
}

function Calculator(state = initialState) {    
    let log = "";
    log += "Constants:\n";
    log += FormatLog("VALIDATOR_DEPOSIT", ΞVALIDATOR_DEPOSIT,"Ξ");
    log += FormatLog("EPOCH_PER_YEAR", EPOCH_PER_YEAR);
    log += FormatLog("BASE_REWARD_FACTOR", BASE_REWARD_FACTOR);
    log += FormatLog("BASE_REWARDS_PER_EPOCH", BASE_REWARDS_PER_EPOCH);

    log += "\nInputs:\n";
    log += FormatLog("$Invest",         state.$Invest,       "$");
    log += FormatLog("$HardwareCost",   state.$HardwareCost, "$");
    log += FormatLog("$ETHPrice",       state.$ETHPrice,     "$");
    log += FormatLog("validatorUptime", state.validatorUptime*100, "%");
    log += FormatLog("totalUptime    ", state.totalUptime*100,     "%");
    
    log += "\nCalculations:\n";

    let ΞInvest = (state.$Invest - state.$HardwareCost) / state.$ETHPrice;
    log += FormatLog("ΞInvest = ($Invest - $HardwareCost)/$ETHPrice", ΞInvest, "Ξ");
    
    let validatorsCount = Math.floor(ΞInvest/ΞVALIDATOR_DEPOSIT);
    log += FormatLog("validatorsCount = floor(ΞInvest/ΞVALIDATOR_DEPOSIT)", validatorsCount)    
    
    let ΞOneValidatorReward = ValidatorReward(state.ΞTotalETHStaked, state.totalUptime, state.validatorUptime)*EPOCH_PER_YEAR;
    log += FormatLog("ΞOneValidatorReward",ΞOneValidatorReward,"Ξ //calculations: https://github.com/skillful-alex/eth2stake/blob/master/src/calculator.js");

    let $ValidatorsInterest = ΞOneValidatorReward*validatorsCount*state.$ETHPrice;
    let $NetworkFees = state.$ISPCostPerMonth*12;
    let $HardwareFees = state.$HardwareCost/state.yearHardwareFullDepreciation;
    let $ElectricityFees = state.$ElectricityCostPerMonthPerValidator*validatorsCount*12;

    log += FormatLog("$ValidatorsInterest = ΞOneValidatorReward*validatorsCount*$ETHPrice",$ValidatorsInterest,"$");
    log += FormatLog("$NetworkFees = $ISPCostPerMonth*12",$NetworkFees,"$");
    log += FormatLog("$HardwareFees = $HardwareCost/yearHardwareFullDepreciation",$HardwareFees,"$");
    log += FormatLog("$ElectricityFees = $ElectricityCostPerMonthPerValidator*validatorsCount*12",$ElectricityFees,"$");

    let $AnnualIncome = $ValidatorsInterest - $HardwareFees - $NetworkFees - $ElectricityFees;
    $AnnualIncome = Math.round($AnnualIncome*100)/100;

    log += FormatLog("$AnnualIncome = $ValidatorsInterest - $HardwareFees - $NetworkFees - $ElectricityFees",$AnnualIncome,"$");
    
    log += "\n\n";

    return {
        ...state,
        $AnnualIncome,
        log,
    }
};

export default Calculator;