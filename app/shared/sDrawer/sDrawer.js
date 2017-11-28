const frameModule = require("ui/frame");

const SideDrawerViewModel = require("./sDrawer-view-model");

/* ***********************************************************
 * Use the "loaded" event handler of the wrapping layout element to bind the view model to your view.
 *************************************************************/
function onLoaded(args) {
    const component = args.object;
    const componentTitle = component.selectedPage;

    component.bindingContext = new SideDrawerViewModel(componentTitle);
}

/* ***********************************************************
 * Use the "tap" event handler of the <GridLayout> component for handling navigation item taps.
 * The "tap" event handler of the app drawer <GridLayout> item is used to navigate the app
 * based on the tapped navigationItem's route.
 *************************************************************/
function onNavigationItemTap(args) {
    const component = args.object;
    const componentRoute = component.route;

    frameModule.topmost().navigate({
        moduleName: componentRoute,
        transition: {
            name: "fade"
        }
    });
}

exports.onLoaded = onLoaded;
exports.onNavigationItemTap = onNavigationItemTap;