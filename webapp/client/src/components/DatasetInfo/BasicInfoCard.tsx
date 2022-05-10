import * as React from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Chip,
  ClickAwayListener,
  Menu,
  MenuItem,
  Divider,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PersonIcon from "@material-ui/icons/Person";
import StripeCheckout from "react-stripe-checkout";
import {STRIPETOKEN} from "../ConfigEnv";

const BasicInfoCard = (
  {
    dataset,
    isMoreOptionsOpened,
    onMoreOptions,
    onBuy,
    onGetSampleData,
    handleSendEmail,
    user
  }) => {
  const renderSearchTerms = (terms: any[]) => {
    if(!terms) {
      return;
    }
    return terms.map((term, index) => (
        <Chip label={term} key={`basic-info-chip-${index}`}></Chip>
    ));
  };

  const renderPrice = (price: number) => {
    if(!price) {
      return;
    }
    return `$${price.toFixed(2)}`
  };

  const onMenuAction = (isOpen) => {
      onMoreOptions(isOpen);
  };

  const handleClose = () => {
    onMoreOptions(false);
  };

  const onToken = async (token) => {
    onBuy(token, dataset, user);
  };

  return(
    <Card>
      <CardHeader
        title={dataset.name}
        subheader={dataset.description}
        avatar={<Avatar> <PersonIcon/></Avatar>}
        action={<div id={"card-more-options"} ><MoreVertIcon onClick={() => onMenuAction(true)}/></div>}
      ></CardHeader>
      <CardContent>
        <Typography className={"card-content-title"}>Dataset Information</Typography>
        <Typography className={"card-content-sub-title"}>Delivery Method</Typography>
        <Typography className={"card-content-sub-desc"}>{dataset['delivery_method']}</Typography>
        <Divider/>
        <Typography className={"card-content-sub-title"}>Tags</Typography>
        <div className={"card-content-sub-desc"}>{renderSearchTerms(dataset['search_terms'])}</div>
        <Divider/>
        <Typography className={"card-content-sub-title"}>Location</Typography>
        <Typography className={"card-content-sub-desc"}>{dataset['country']}, {dataset['state_province']}</Typography>
        <Divider/>
        <Typography className={"card-content-sub-title"}>Total Records</Typography>
        <Typography className={"card-content-sub-desc"}>{dataset['num_of_records']}</Typography>
        <Divider/>
        <Typography className={"card-content-price"}> {renderPrice(dataset['price_high'])}</Typography>
        <StripeCheckout
          name="Dataset NFT"
          description={'checkout'}
          panelLabel={`Pay ${dataset['price_high']}$`}
          amount={0} //Amount in cents $9.99
          token={onToken}
          label="Buy"
          locale="auto"
          stripeKey={STRIPETOKEN}
          image="https://www.rebloc.io/img/favicon.png" //Pop-in header image
          billingAddress={false}
        />
      </CardContent>
        <Menu
          open={isMoreOptionsOpened}
          anchorEl={document.getElementById('card-more-options')}
        >
          <ClickAwayListener onClickAway={handleClose}>{/*TODO: Fix clickaway*/}
            <MenuItem onClick={handleSendEmail}>
              <Typography>Send Email To The Owner</Typography>
            </MenuItem>
          </ClickAwayListener>
        </Menu>
    </Card>
  );
};

export default BasicInfoCard;
