const validateJsonSchema = (parsed) => {
    // Check top-level fields exist
    if (typeof parsed.user !== "string")
        throw new Error("Invalid JSON schema: 'user' must be a string");
    if (typeof parsed.date !== "string" || isNaN(Date.parse(parsed.date)))
        throw new Error("Invalid JSON schema: 'date' must be a valid date string");
    if (typeof parsed.player !== "string")
        throw new Error("Invalid JSON schema: 'player' must be a string");
    if (!Array.isArray(parsed.pulls))
        throw new Error("Invalid JSON schema: 'pulls' must be an array");
    if (parsed.pulls.length === 0)
        throw new Error("Invalid JSON schema: 'pulls' cannot be empty");

    // Check each pull entry
    parsed.pulls.forEach((pull, index) => {
        if (typeof pull.BossName !== "string")
            throw new Error(`Invalid JSON schema: 'BossName' must be a string at pulls[${index}]`);
        if (typeof pull.DamageDone !== "number")
            throw new Error(`Invalid JSON schema: 'DamageDone' must be a number at pulls[${index}]`);
        if (typeof pull.DeathCount !== "number")
            throw new Error(`Invalid JSON schema: 'DeathCount' must be a number at pulls[${index}]`);
        if (typeof pull.HealingDone !== "number")
            throw new Error(`Invalid JSON schema: 'HealingDone' must be a number at pulls[${index}]`);
    });
};

export default validateJsonSchema;