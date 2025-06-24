import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

export default function AddPlantScreen() {
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)

    const handleSave = () => {
        if(!name || !type) {
            Alert.alert("Please fill all fields!")
        }

        setName('')
        setType('')
        setDate(new Date())
    }

    return (
        <View style={{padding: 20}}>
            <Text>Plant name:</Text>
            <TextInput value={name} onChangeText={setName} style={{borderWidth: 1, marginBottom: 10}}/>
            <Text>Type:</Text>
            <TextInput value={type} onChangeText={setType} style={{borderWidth: 1, marginBottom: 10}}/>
            <Text>Planted on (date)</Text>
            <Button title={date.toDateString()} onPress={() => setShowDatePicker(true)}/>
            {showDatePicker && (
                <DateTimePicker 
                    value={date}
                    mode="date"
                    // display="default"
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false)
                        if(selectedDate) setDate(selectedDate)
                    }}
                />
            )}
        </View>
    )
}