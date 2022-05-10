import { makeStyles, createStyles, Theme} from '@material-ui/core/styles';

const appDrawerStyles = makeStyles((theme: Theme) => createStyles({
  toolbar: theme.mixins.toolbar
}));

export default appDrawerStyles;
