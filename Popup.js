import React, {Component} from 'react';
import PopupDialog from 'react-native-popup-dialog';
import { Picker, Platform, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import DateTimePicker from './Datepick.js';

class Popup extends React.Component{
  state = {
    name: '',
    details: '',
    eventStartDate: 'Choose Event Start Time',
    eventEndDate: 'Choose Event End Time',
    tag: 'food',
  }
  show(lat, long) {
    this.lat = lat;
    this.long = long;
    this.popupDialog.show();
  }
  sendInformation() {
    let dbRef = this.props.db.database().ref('events');
    dbRef.push({
      coordinate: {latitude: this.lat, longitude: this.long},
      description: this.state.details,
      title: this.state.name,
      date: {
        // milliseconds since epoch
        start: new Date(this.state.eventStartDate).getTime(),
        end: new Date(this.state.eventEndDate).getTime()
      },
      tag: this.state.tag
    });
    console.log('hi')
    console.log(this.state.name)
    console.log(this.state.details)
    console.log(this._startDateTimePicker.state.date)
    console.log(this._endDateTimePicker.state.date)
    console.log(this.long)
    console.log(this.lat)
    this.popupDialog.dismiss()
  }

  setStartDate = (date) => this.setState({eventStartDate: date});
  setEndDate = (date) => this.setState({eventEndDate: date});

  render() {
    return (
      <PopupDialog
        ref={(popupDialog) => { this.popupDialog = popupDialog; }}
      >
        <View>
        <TextInput
          style={{height: 40}}
          placeholder="Enter Event Name"
          onChangeText={(name) => this.setState({name})}
          ref = {(textInput) => {this.textInput = textInput; }}
        />
        <DateTimePicker
          ref={(startDateTimePicker) => {this._startDateTimePicker = startDateTimePicker;}}
          onChange={this.setStartDate}/>
        <Button
          title={this.state.eventStartDate.substring()}
          color="#4B0082"
          onPress={() => this._startDateTimePicker._showDateTimePicker()}
        />
        <DateTimePicker
          ref={(endDateTimePicker) => {this._endDateTimePicker = endDateTimePicker;}}
          onChange={this.setEndDate}/>
        <Button
          title={this.state.eventEndDate.toString()}
          color="#4B0082"
          onPress={() => this._endDateTimePicker._showDateTimePicker()}
                  // this.setState({textValue:{this._endDateTimePicker.date}})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="Enter Event Details"
          onChangeText={(details) => this.setState({details})}
          ref = {(textInput) => {this.textInputD = textInput; }}
        />
        <Picker
          selectedValue={this.state.tag.toString()}
          onValueChange={(itemValue, itemIndex) => this.setState({tag: itemValue})}>
          <Picker.Item label="Food" value="food" />
          <Picker.Item label="Gluten Free" value="gluten" />
          <Picker.Item label="Vegetarian" value="veg" />   
          <Picker.Item label="Other" value="other" />       
        </Picker>
        <Button
          title="Save"
          color="#32CD32"
          accessibilityLabel="Learn more about this purple button"
          onPress={() => this.sendInformation()}
        />
        <Button
          title="Cancel"
          color="#DC143C"
          accessibilityLabel="Learn more about this purple button"
          onPress={() => this.popupDialog.dismiss()}
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
