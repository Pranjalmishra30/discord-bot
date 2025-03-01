import { BeccaInt, ResponsesInt } from "../interfaces/BeccaInt";

/**
 * Validates that all expected environment variables are set with *some* value.
 * Does not validate that the values are valid. Constructs a config object and
 * attaches it to Becca's instance. Also constructs the colours and responses objects
 * and attaches them.
 *
 * @param {BeccaInt} Becca Becca's Discord instance.
 * @returns {Object} Object containing a valid property as boolean, and a message as string.
 */
export const validateEnv = (
  Becca: BeccaInt
): { valid: boolean; message: string } => {
  try {
    if (!process.env.DISCORD_TOKEN) {
      return { valid: false, message: "Missing Discord token!" };
    }

    if (!process.env.MONGODB) {
      return { valid: false, message: "Missing database connection string" };
    }

    if (!process.env.WH_URL) {
      return { valid: false, message: "Missing Discord webhook URL" };
    }

    if (!process.env.CURRENCY_WH) {
      return { valid: false, message: "Missing Discord Currency webhook URL" };
    }

    if (!process.env.NASA_API) {
      return { valid: false, message: "Missing NASA API key" };
    }

    if (!process.env.OWNER_ID) {
      return { valid: false, message: "Missing Discord ID for owner account" };
    }

    if (!process.env.CLIENT_ID) {
      return { valid: false, message: "Missing Bot's Client ID" };
    }

    if (!process.env.HOME_GUILD_ID) {
      return { valid: false, message: "Missing Bot's Home Guild ID" };
    }

    const configs = {
      token: process.env.DISCORD_TOKEN,
      dbToken: process.env.MONGODB,
      whUrl: process.env.WH_URL,
      currencyUrl: process.env.CURRENCY_WH,
      nasaKey: process.env.NASA_API,
      ownerId: process.env.OWNER_ID,
      love: process.env.BECCA_LOVE || "💜",
      yes: process.env.BECCA_YES || "✅",
      no: process.env.BECCA_NO || "❌",
      think: process.env.BECCA_THINK || "🤔",
      version: process.env.npm_package_version || "null",
      id: process.env.CLIENT_ID,
      homeGuild: process.env.HOME_GUILD_ID,
    };

    Becca.configs = configs;

    const colours = {
      default: 0x8b4283,
      success: 0x1f8b4c,
      warning: 0xc27c0e,
      error: 0x992d22,
    };

    Becca.colours = colours;

    const phrases: ResponsesInt = {
      missingGuild: "It seems I cannot locate your guild record.",
      invalidCommand:
        "I am not sure how this happened, but that spell does not appear to be valid.",
      noPermission: "You do not have the correct skills to use this spell.",
      ownerOnly: "Only my owner can ask me to do this.",
      missingParam:
        "This is impressive. You have managed to forget a required component for this spell.",
      defaultModReason:
        "Unfortunately, they could not be bothered to tell me why.",
      noModBecca:
        "Brave of you to try to make me your target. Foolish, but brave.",
      noModSelf: "Are... are you asking me to smite you?",
    };

    Becca.responses = phrases;

    return { valid: true, message: "Environment variables validated!" };
  } catch (err) {
    return {
      valid: false,
      message: "Unknown error when validating environment",
    };
  }
};
