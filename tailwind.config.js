const tailwindConfig = require("./node_modules/tailwindcss/stubs/defaultConfig.stub.js");

tailwindConfig.theme.screens.smWidth = parseInt(
  tailwindConfig.theme.screens.sm.replace("px", "")
);
tailwindConfig.theme.screens.mdWidth = parseInt(
  tailwindConfig.theme.screens.md.replace("px", "")
);
tailwindConfig.theme.screens.lgWidth = parseInt(
  tailwindConfig.theme.screens.lg.replace("px", "")
);
tailwindConfig.theme.screens.xlWidth = parseInt(
  tailwindConfig.theme.screens.xl.replace("px", "")
);
tailwindConfig.variants.display = ["active", "focus", "hover", "responsive"];

module.exports = tailwindConfig;
