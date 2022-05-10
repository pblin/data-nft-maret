import * as React from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

const BasicInfoOwnerCard = ({dataset, onUpdate, isPublished}) => {
  const renderSearchTerms = (terms: any[]) => {
    console.log('here are the terms');
    console.log(terms);
    if(!terms) {
      return <Typography>Not Set</Typography>
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

  const renderData = (data: any) => {
    if(!data) {
      return `Not Set`
    }

    return data;
  };

  return(
    <Card>
      <CardHeader
        title={dataset.name}
        subheader={dataset.description}
        avatar={<Avatar> <PersonIcon/></Avatar>}
      ></CardHeader>
      <CardContent>
        <Typography className={"card-content-title"}>Dataset Information</Typography>
        <Typography className={"card-content-sub-title"}>Delivery Method</Typography>
        <Typography className={"card-content-sub-desc"}>{renderData(dataset['delivery_method'])}</Typography>
        <Divider/>
        <Typography className={"card-content-sub-title"}>Tags</Typography>
        <div className={"card-content-sub-desc"}>{renderSearchTerms(dataset['search_terms'])}</div>
        <Divider/>
        <Typography className={"card-content-sub-title"}>Location</Typography>
        <Typography className={"card-content-sub-desc"}>{dataset['country']}, {dataset['state_province']}</Typography>
        <Divider/>
        <Typography className={"card-content-sub-title"}>Total Records</Typography>
        <Typography className={"card-content-sub-desc"}>{renderData(dataset['num_of_records'])}</Typography>
        <Divider/>
        <Typography className={"card-content-sub-title"}>Price</Typography>
        <Typography className={"card-content-sub-desc"}> {renderData(renderPrice(dataset['price_high']))}</Typography>
        {!isPublished &&
          <Button
            color={"secondary"}
            variant={"contained"}
            className={"dataset-buy"}
            onClick={onUpdate}
          >
            Update Information
          </Button>
        }
      </CardContent>
    </Card>
  );
};

export default BasicInfoOwnerCard;
