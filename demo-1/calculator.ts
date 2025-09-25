// data: 
// initial amount
// annual contribution
// expected return
// duration

type investmentData = {
    initialAmmount: number;
    annualContribution: number;
    expectedReturn: number;
    duration: number;
}

type investmentResult = {
    year: number;
    totalAmmount: number
    totalInterestEarned: number;
    totalContributions: number;
} 

type CalculationResult = investmentResult[] | string;

function calculateInvestment({ annualContribution, duration, expectedReturn, initialAmmount}: investmentData): CalculationResult {
    if(duration <= 0) {
        return "Erro, valor inválido de anos de investimento";
    }
    
    if(initialAmmount <= 0) {
        return "Não é possível iniciar um investimento sem valor";
    }
        
    if(expectedReturn < 0) {
        return "O retorno esperado deve ser pelo menos zero"
    }

    let returnData: investmentResult[] = [];
    let total = initialAmmount;
    let totalContributions = 0;
    let totalInterestEarned = 0;

    for(let i = 0; i < duration; i++) {
        total *= (1 + expectedReturn);
        totalInterestEarned = total - totalContributions - initialAmmount;
        totalContributions = totalContributions + annualContribution;
        total += annualContribution;

        returnData.push({
          totalAmmount: total,
          totalContributions,
          totalInterestEarned,
          year: i + 1  
        })
    }

    return returnData;
}

function printResults(results: CalculationResult) {
    console.log("# Investment Data:")
    if(typeof results === 'string') {
        console.log(results);
        return;
    }

    for(const investment of results) {
        console.log(`
            Year: ${investment.year}\n
            Total Contributions: $${investment.totalContributions}\n
            Total Interest Earned:$${investment.totalInterestEarned}\n
            Total: $${investment.totalAmmount}`)
    }
}

const results = calculateInvestment({
    annualContribution: 500,
    duration: 12,
    expectedReturn: 0.08,
    initialAmmount: 5000
})

printResults(results)