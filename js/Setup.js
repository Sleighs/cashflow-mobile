var Setup = {
    pCount: 1,
    playerName: 'player1'
}

// formerly setup.scenario
Setup.newPlayer = function(playerScenario) {
    this.jobTitle = playerScenario[0];
    this.startingSalary = playerScenario[1];
    this.startingSavings = playerScenario[2];
    this.taxes = playerScenario[3];
    this.mortgagePayment = playerScenario[4];

    this.carPayment = playerScenario[5];
    this.creditCardPayment = playerScenario[6];
    this.retailPayment = playerScenario[7];
    this.otherExpenses = playerScenario[8];
    this.cash = 0;

    this.mortgage = playerScenario[9];
    this.carLoan = playerScenario[10];
    this.creditDebt = playerScenario[11];
    this.retailDebt = playerScenario[12];
    this.position = 0;

    this.charityTurns = 0;
    this.childExpense = 0;
    this.children = 0;
    this.name = Setup.playerName;
    this.totalIncome = 0;

    this.totalExpenses = 0;
    this.payday = 0;
    this.assetIncome = 0;
    this.passiveIncome = 0;
    this.loans = 0;

    this.loanPayment = 0;
    this.boatLoan = 0;
    this.boatPayment = 0;
    this.downsizedTurns = 0;
    this.stockAssets = [];

    this.realEstateAssets = [];
    this.businessAssets = [];
    this.coinAssets = [];
    this.personalAssets = [];
    this.fastTrack = false;

    this.fastTrackOption = false;
    this.cashFlowDay = 0;
    this.insurance = 0;
    this.hasInsurance = false;
    this.fastTrackAssets = [];

    this.loanApproval = true;
    this.mortgagePrepay = false;
    this.moved = false;
    this.income = [
        {
            type: playerScenario[0] + 'Salary',
            amount: playerScenario[1]
        }
    ]
    this.expenses = [
        {
            type: 'mortgage',
            cost: playerScenario[9],
            payment: playerScenario[4]
        },
        {
            type: 'car loan',
            cost: playerScenario[10],
            payment: playerScenario[5]
        },
        {
            type: 'credit debt',
            cost: playerScenario[11],
            payment: playerScenario[6]
        },
        {
            type: 'retail debt',
            cost: playerScenario[12],
            payment: playerScenario[7]
        }
    ]
};

Setup.scenarioChoices = [
    ["Airline Pilot", 9500, 400, 2350, 1300, 300, 660, 50, 2210, 143000, 15000, 22000, 1000],
    ["Business Manager", 4600, 400, 910, 700, 120, 90, 50, 1000, 75000, 6000, 3000, 1000],
    ["Doctor (MD)", 13200, 400, 3420, 1900, 380, 270, 50, 2880, 202000, 19000, 9000, 1000],
    ["Engineer", 4900, 400, 1050, 700, 140, 120, 50, 1090, 75000, 7000, 4000, 1000],
    ["Janitor", 1600, 560, 280, 200, 60, 60, 50, 300, 20000, 4000, 2000, 1000],
    ["Lawyer", 7500, 400, 1830, 1100, 220, 180, 50, 1650, 115000, 11000, 6000, 1000],
    ["Mechanic", 2000, 670, 360, 300, 60, 60, 50, 450, 31000, 3000, 2000, 1000],
    ["Nurse", 3100, 480, 600, 400, 100, 90, 50, 710, 47000, 5000, 3000, 1000],
    ["Police Officer", 3000, 520, 580, 400, 100, 60, 50, 690, 46000, 5000, 2000, 1000],
    ["Secretary", 2500, 710, 460, 400, 80, 60, 50, 570, 38000, 4000, 2000, 1000],
    ["Teacher (K-12)", 3300, 400, 630, 500, 100, 90, 50, 760, 50000, 5000, 3000, 1000],
    ["Truck Driver", 2500, 750, 460, 400, 80, 60, 50, 570, 38000, 4000, 2000, 1000],
    ["CEO", 24000, 60000, 7200, 1900, 800, 250, 50, 4200, 750000, 30000, 11000, 1000]
];

export default Setup