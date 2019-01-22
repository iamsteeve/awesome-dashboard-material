import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import pink from '@material-ui/core/colors/pink';
import {MuiThemeProviderProps} from "@material-ui/core/styles/MuiThemeProvider";


const theme = createMuiTheme({
    palette: {
        primary: {
            light: orange[300],
            main: orange[800],
            dark: orange[700],
        },
        secondary: {
            light: pink[300],
            main: pink[500],
            dark: pink[700],
        },
    },
    typography: {
        htmlFontSize: 10,
        useNextVariants: true,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Dosis"',
            '"Segoe UI"',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),

    },
});

export interface PageContext extends MuiThemeProviderProps {
    generateClassName: any ; // not sure what goes here
    sheetsRegistry: SheetsRegistry;
}

function createPageContext(): PageContext  {
    return {
        theme,
        // This is needed in order to deduplicate the injection of CSS in the page.
        sheetsManager: new Map(),
        // This is needed in order to inject the critical CSS.
        sheetsRegistry: new SheetsRegistry(),
        // The standard class name generator.
        generateClassName: createGenerateClassName(),
        children: undefined,
    };
}

let pageContext: PageContext | undefined;

export default function getPageContext(): PageContext {
    // Make sure to create a new context for every server-side request so that data
    // isn't shared between connections (which would be bad).
    if (!process.browser) {
        return createPageContext();
    }

    // Reuse context on the client-side.
    if (!pageContext) {
        pageContext = createPageContext();
    }

    return pageContext;
}
