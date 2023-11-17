import { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,Switch,Pressable, View, SafeAreaView, ScrollView, TextInput } from 'react-native';


const App = () => {
const [morning, onmorning] = useState('');
const [afternoon, onafternoon] = useState('');
const [evening, onevening] = useState('');
const [renewable, onrenewable] = useState(true);
const [morcoast,setmorningcoast] = useState(null);
const [aftercoast,setafternooncoast] = useState(null);
const [evencoast,seteveningcoast] = useState(null);
const [total,settotal] = useState(null);
const [tax,settax] = useState(null);
const [rebate,setrebate] = useState(null)
const [renergy,totalrenewable] = useState(null)
const [regularitycharge,setcharge] = useState(null)
const [finalbill,setfinalbill] = useState(null)
const [result, setResult] = useState(null);
const [show, setshow] = useState(false);
const [error, seterror] = useState(false);


const reset = () =>{
  onmorning(''),
  onafternoon(''),
  onevening('')

}
const calculate = () => {
  console.log(`Pressable clicked`);
  if(!morning || !afternoon || !evening){
    setshow(false);
    console.log(`value empty`);
    setResult("Error:You must need to enter all the value.")
    
  } else {
    setshow(true);
    const calmorningcoast = morning * 0.132;
    setmorningcoast(calmorningcoast.toFixed(2))
    const calafternoon = afternoon * 0.065;
    setafternooncoast(calafternoon.toFixed(2))
    const calevening = evening * 0.094;
    seteveningcoast(calevening.toFixed(2))
    const totalusage = calmorningcoast + calafternoon + calevening
    settotal(totalusage.toFixed(2))
    const totaltax = totalusage * 0.13
    settax(totaltax.toFixed(2))

    if(renewable == true){
      const totalrenewable = totalusage * 0.08
      setrebate(totalrenewable.toFixed(2))
      const rcharge = totaltax - totalrenewable
      setcharge(rcharge.toFixed(2))
      const finalamount = totalusage + rcharge
      setfinalbill(finalamount.toFixed(2))
    }
    else{
      const totalrenewable = totalusage * 0
      setrebate(totalrenewable.toFixed(2))
      const rcharge = totaltax - totalrenewable
      setcharge(rcharge.toFixed(2))
      const finalamount = totalusage + rcharge
      setfinalbill(finalamount.toFixed(2))
    }
    
  }
 
}
  return(
   
   <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={true} showsHorizontalScrollIndicator={true}>
           <Text style={styles.textStyle}>Electricity Bill Calculator </Text>
            <Text style={styles.usage}>Morning Usage(kwh) </Text> 
          <TextInput 
                style={styles.input}
                placeholder="Enter Morning Usage"
                keyboardType = "numeric"
                keyboardAppearance="dark"
                returnKeyType="next"
                value={morning}
                onChangeText={onmorning}
            />
             <Text style={styles.usage}>Afternoon Usage(kwh) </Text> 
               <TextInput 
                style={styles.input}
                placeholder="Enter Afternoon Usage"
                keyboardType = "numeric"
                keyboardAppearance="dark"
                returnKeyType="next"
                value={afternoon}
                onChangeText={onafternoon}
            />
             <Text style={styles.usage}>Evening Usage(kwh) </Text> 
               <TextInput 
                style={styles.input}
                placeholder="Enter Evening Usage"
                keyboardType = "numeric"
                keyboardAppearance="dark"
                returnKeyType="next"
                value={evening}
                onChangeText={onevening}
            />
            <Text style={styles.usage}>Use Renewable Energy Resource ?</Text>
            
            <Switch
                value={renewable}
                onValueChange={onrenewable}
                thumbColor={renewable ? "white" : "black"}
                trackColor={ {false: "white", true: "lightseagreen"}}
            />
          
          <Pressable onPress={reset} style={[styles.reset]}>
                    <Text style={styles.resettext}>Reset</Text>
           </Pressable> 
           <Pressable onPress={calculate} style={[styles.button]}>
                    <Text style={styles.calculate}>Calculate</Text>
           </Pressable>
                    {!show && <Text style={styles.error}>{result}</Text>}
                    {show && <Text style={styles.charges}> Charges Breakdown</Text>}
                    {show && <View style = {styles.view}>

                    {show && <Text style={styles.output}> Morning Usage is: ${morcoast}</Text>}
                    {show && <Text style={styles.output}> Afternoon Usage is: ${aftercoast}</Text>}
                    {show && <Text style={styles.output}> Evening Usage is: ${evencoast}</Text>}
                    {show && <Text style={styles.output}> Total Usage is: ${total}</Text>}
                    {show && <Text style={styles.output}> Total Tax is: ${tax}</Text>}
                    {show && <Text style={styles.output}> Total Environmental Rebate is: ${rebate}</Text>}
                    {show && <Text style={styles.output}> Total Regularity charge is: ${regularitycharge}</Text>}
                    </View> }
                    {show && <Text style={styles.finalbill}> You must pay: ${finalbill}</Text>}    
    
    </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin:15,
    justifyContent: 'center',
  },
     textStyle : {
        fontSize: 28,
        color: 'lightseagreen',
        fontStyle: 'normal',
        fontWeight : 'bold',
        alignContent:'center',
        alignItems:'center',
        textAlign:'center',
    },
  input: {
        height: 37,
        margin: 5,
        borderWidth: 1,
        fontSize: 20,
        paddingLeft:10,
        borderRadius:10,
    
    },
     usage: {
        fontSize: 18,
        color: 'black',
        fontStyle: 'normal',
        fontWeight : 'bold',
        marginTop:25,
    },
    output:{
      fontSize: 18,
      color: 'black',
      fontStyle: 'normal',
      fontWeight : 'bold',
      marginTop:5,
       
    },
    view:{
      borderWidth:1,
      backgroundColor: 'linen',
      marginTop:5,
      padding:7,
      marginEnd:20,
    },
    calculate:{
      fontSize: 22,
      color: 'black',
      fontStyle: 'normal',
      fontWeight : 'bold',
      textAlign:'center',
    },
    button:{
      padding: 12,
      backgroundColor:'lightseagreen',
      marginBottom: 15,
      width:190,
      marginTop: 10,
      marginLeft: 90,
      borderRadius:10,
      textAlign:'center',
    },
    error:{
      fontSize: 18,
      color: 'red',
      fontStyle: 'normal',
      fontWeight : 'bold',
      marginTop:8,
    },
    finalbill:{
      fontSize: 18,
      color: 'red',
      fontStyle: 'normal',
      fontWeight : 'bold',
      padding:15,
      marginTop:8,
      marginEnd:20,
      backgroundColor:'lightsteelblue',
      textAlign:'center',
    },
    charges : {
      fontSize: 25,
      color: 'peru',
      fontStyle: 'normal',
      fontWeight : 'bold',
      alignContent:'center',
      alignItems:'center',
      textAlign:'center'
  },
  resettext:{
    fontSize: 22,
    color: 'black',
    fontStyle: 'normal',
    fontWeight : 'bold',
    textAlign:'center',
  },
  reset:{
      padding: 12,
      backgroundColor:'lightseagreen',
      marginBottom: 15,
      width:190,
      marginTop: 1,
      marginLeft: 90,
      borderRadius:10,
      textAlign:'center',
  },
});
export default App;