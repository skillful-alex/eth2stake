//https://github.com/ethereum/eth2.0-specs/blob/dev/specs/core/0_beacon-chain.md#rewards-and-penalties
const BASE_REWARD_FACTOR = 64;
const WHISTLEBLOWER_REWARD_QUOTIENT	= 512;
const PROPOSER_REWARD_QUOTIENT	= 8;
const INACTIVITY_PENALTY_QUOTIENT = 33554432;
//const INACTIVITY_PENALTY_QUOTIENT = INVERSE_SQRT_E_DROP_TIME^2;
//const INVERSE_SQRT_E_DROP_TIME := 2^12*epochs;// (about 18 days) 
const MIN_SLASHING_PENALTY_QUOTIENT	= 32;
const ETH_VALIDATOR_EPOCH_REWARD  = 0.000018788;
const ETH_VALIDATOR_EPOCH_PENALTY = 0.000016393;

const ETH_VALIDATOR_DEPOSIT = 32;
const SEC_PER_SLOT = 6;
const SLOTS_PER_EPOCH = 64;
const EPOCH_PER_YEAR = 365*24*60*60/(SLOTS_PER_EPOCH*SEC_PER_SLOT);

const initialState = {
    $Invest: 100000,
    $ETHPrice: 185,
    $HardwareCost: 200*3,             // beacon+validator+hotreserve
    yearHardwareFullDepreciation: 4,
    $ISPCostPerMonth: 20,
    $ElectricityCostPerMonthPerValidator: 10/64,
    validatorUptime: 0.99,
}

function FormatLog(varName, value, unit) {
    unit = unit||"";
    value = Math.round(value*100)/100;
    return varName +"="+ value + unit+"\n";
}

function Calculator(state = initialState) {    
    let log = ""
    log += FormatLog("const ETH_VALIDATOR_DEPOSIT", ETH_VALIDATOR_DEPOSIT)
    log += FormatLog("const EPOCH_PER_YEAR", EPOCH_PER_YEAR)
    
    log += FormatLog("input $invest", state.$Invest, "$")
    log += FormatLog("input $HardwareCost", state.$HardwareCost, "$")
    log += FormatLog("input $ETHPrice", state.$ETHPrice, "$")
    log += FormatLog("input validatorUptime", state.validatorUptime*100, "%")
    
    let ΞInvest = (state.$Invest - state.$HardwareCost) / state.$ETHPrice;
    log += FormatLog("calc Ξinvest = ($invest - $HardwareCost)/$ETHPrice", ΞInvest, "Ξ")
    
    let validatorsCount = Math.floor(ΞInvest/ETH_VALIDATOR_DEPOSIT);
    log += FormatLog("calc validatorsCount = floor(ΞInvest/ETH_VALIDATOR_DEPOSIT)", validatorsCount)

    let ΞValidatorYearReward  = EPOCH_PER_YEAR   *state.validatorUptime *ETH_VALIDATOR_EPOCH_REWARD;
    let ΞValidatorYearPenalty = EPOCH_PER_YEAR*(1-state.validatorUptime)*ETH_VALIDATOR_EPOCH_PENALTY;

    log += FormatLog("calc ΞValidatorYearReward  = EPOCH_PER_YEAR * validatorUptime     * ETH_VALIDATOR_EPOCH_REWARD" ,ΞValidatorYearReward ,"Ξ");
    log += FormatLog("calc ΞValidatorYearPenalty = EPOCH_PER_YEAR * (1-validatorUptime) * ETH_VALIDATOR_EPOCH_PENALTY",ΞValidatorYearPenalty,"Ξ");
    
    let ΞValidatorInterest = ΞValidatorYearReward-ΞValidatorYearPenalty;
    log += FormatLog("calc ΞValidatorInterest = ΞValidatorYearReward-ΞValidatorYearPenalty",ΞValidatorInterest,"Ξ");

    let $ValidatorsInterest = ΞValidatorInterest*validatorsCount*state.$ETHPrice;
    let $NetworkFees = state.$ISPCostPerMonth*12;
    let $HardwareFees = state.$HardwareCost/state.yearHardwareFullDepreciation;
    let $ElectricityFees = state.$ElectricityCostPerMonthPerValidator*validatorsCount*12;

    log += FormatLog("calc $ValidatorsInterest = ΞValidatorInterest*validatorsCount*$ETHPrice",$ValidatorsInterest,"$");
    log += FormatLog("calc $NetworkFees = $ISPCostPerMonth*12",$NetworkFees,"$");
    log += FormatLog("calc $HardwareFees = $HardwareCost/yearHardwareFullDepreciation",$HardwareFees,"$");
    log += FormatLog("calc $ElectricityFees = $ElectricityCostPerMonthPerValidator*validatorsCount*12",$ElectricityFees,"$");

    let $AnnualIncome = $ValidatorsInterest - $HardwareFees - $NetworkFees - $ElectricityFees;

    log += FormatLog("calc $AnnualIncome = $ValidatorsInterest - $HardwareFees - $NetworkFees - $ElectricityFees",$AnnualIncome,"$");
    
    console.log(log);

    return {
        ...state,
        $AnnualIncome,
        log,
    }
};

export default Calculator;