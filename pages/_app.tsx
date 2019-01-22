import * as React from 'react';
import App, {AppProps, Container, DefaultAppIProps} from 'next/app';
import Head from 'next/head';
import {JssProvider } from 'react-jss';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import getPageContext, { PageContext } from '../src/theme/getPageContext';

export interface IAppProps extends DefaultAppIProps, AppProps {
}

class MyApp extends App<IAppProps> {

    private pageContext: PageContext;

    constructor(props: IAppProps) {

        super(props);
        this.pageContext = getPageContext();
    }

    componentDidMount() {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render(): React.ReactNode {
        const { Component, pageProps } = this.props;
        return (
            <Container>
                <Head>
                    <title>My page</title>
                </Head>
                {/* Wrap every page in Styles and Theme providers */}
                <JssProvider
                    registry={this.pageContext.sheetsRegistry}
                    generateClassName={this.pageContext.generateClassName}
                >
                    {/* ThemeProvider makes the theme available down the React
              tree thanks to React context. */}
                    <MuiThemeProvider theme={this.pageContext.theme} sheetsManager={this.pageContext.sheetsManager}>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
                        <Component pageContext={this.pageContext} {...pageProps} />
                    </MuiThemeProvider>
                </JssProvider>
            </Container>
        );
    }


}

export default MyApp;
