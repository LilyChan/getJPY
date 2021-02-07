import React from 'react';
import moment from "moment";
import swal from 'sweetalert';
import { saveAs } from 'file-saver';
import { Meteor } from 'meteor/meteor';
import { Grid, Image, Button, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  download(){
    Meteor.call('getJPYrate', function(err, res) {
      if (err) {
        swal( 'Oops...', '取得資料失敗，請稍後再試！', 'error' );
      }
      if (res) {
          const data = new Blob([res], {type: "text/plain;charset=utf-8"});
          saveAs(data, moment().format('YYYYMMDD_日幣匯率')+'.txt');
      }
    });
  }

  render() {
    return (
        <Grid centered columns={1}>
          <Grid.Row centered>
            <Image size='small' circular src="/images/bank-of-taiwan-logo.png"/>
          </Grid.Row>

          <Grid.Row centered>
            <Button animated='fade' onClick={this.download}>
                <Button.Content visible>Get JPY</Button.Content>
                <Button.Content hidden>
                  <Icon name='download' />
                </Button.Content>
            </Button>
          </Grid.Row>

        </Grid>
    );
  }
}

export default Landing;
