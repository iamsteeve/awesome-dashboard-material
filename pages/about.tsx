import * as React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
});

interface IPropsAbout extends WithStyles<typeof styles> {

}

class About extends React.Component<IPropsAbout, {}> {
    constructor(props: IPropsAbout){
        super(props);
    }
    render(): React.ReactNode {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Typography variant="h4" gutterBottom>
                    Material-UI
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    about page
                </Typography>
                <Typography gutterBottom>
                    <Link href="/">
                        <a>Go to the main page</a>
                    </Link>
                </Typography>
                <Button variant="contained" color="primary">
                    Do nothing button
                </Button>
            </div>
        );
    }


}

export default withStyles(styles)(About);
