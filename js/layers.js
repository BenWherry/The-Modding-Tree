addLayer("Fridges", {
    name: "Fridges", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    layerShown(){return true},
    color: "#00A6FF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Fridges", // Name of prestige currency
    baseResource: "calories", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    upgrades: {
        rows: 1,
        cols: 1,
        11: {
            title: "More food",
            description: 'You have more food to eat, doubling your calorie gain',
            cost: new Decimal(2)
        }
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade(this.layer,11)) {
            mult = mult.mult(2)
        }
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "f", description: "Reset for Fridges", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
})
