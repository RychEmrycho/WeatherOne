if (global.TNS_WEBPACK) {
    // registers tns-core-modules UI framework modules
    require("bundle-entry-points");

    // register application modules
    global.registerModule("nativescript-pro-ui/sidedrawer",
        () => require("../node_modules/nativescript-pro-ui/sidedrawer"));

    global.registerModule("shared/sDrawer/sDrawer", () => require("./shared/sDrawer/sDrawer"));
    global.registerModule("cuaca/cuaca-page", () => require("./cuaca/cuaca-page"));
    global.registerModule("pengaturan/pengaturan-page", () => require("./pengaturan/pengaturan-page"));
}