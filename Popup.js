import React, {Component} from 'react';
import PopupDialog from 'react-native-popup-dialog';
import { Platform, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import DateTimePicker from './Datepick.js';
class Popup extends React.Component{
  show() {
    this.popupDialog.show();
  }
  render() {
    return (
      <PopupDialog
        ref={(popupDialog) => { this.popupDialog = popupDialog; }}
      >
        <View>
        <TextInput
          style={{height: 40}}
          placeholder="Enter Event Name"
          onChangeText={(text) => this.setState({text})}
        />
        <DateTimePicker ref={(startDateTimePicker) => {this._startDateTimePicker = startDateTimePicker;}}/>
        <Button
          title="Choose Event Start Time"
          color="#4B0082"
          onPress={() => this._startDateTimePicker._showDateTimePicker()}
        /> 

        <DateTimePicker ref={(endDateTimePicker) => {this._endDateTimePicker = endDateTimePicker;}}/>
        <Button
          title="Choose Event End Time"
          color="#4B0082"
          onPress={() => this._endDateTimePicker._showDateTimePicker()}
                  // this.setState({textValue:{this._endDateTimePicker.date}})}
        /> 
        <TextInput
          style={{height: 40}}
          placeholder="Enter Event Details"
          onChangeText={(text) => this.setState({text})}
        />
        <Button
          title="Save"
          color="#32CD32"
          accessibilityLabel="Learn more about this purple button"
        />        
        <Button
          title="Cancel"
          color="#DC143C"
          accessibilityLabel="Learn more about this purple button"
        />
        </View>
      </PopupDialog>
      );
    }
  }
/*const popupStyle = StyleSheet.create({
  button: {
    width:60px,
  }

  popupDialog: {
    width:300px,
  }
});*/

export default Popup;