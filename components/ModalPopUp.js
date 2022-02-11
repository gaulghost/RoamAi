import React, {useState} from 'react';
import { Text, View, StyleSheet, Dimensions, Modal, Pressable } from 'react-native';

const ModalPopUp = (props) => {
    const [modalVisible, setModalVisible] = useState(true);
    // if(props.visible == "true"){
    //     setModalVisible(true);
    //     props.visible = "false"
    // }
    return (
        <Modal 
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{props.text}</Text>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                    <Text style={styles.textStyle}>Okay</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
     );
}
 
export default ModalPopUp;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: "rgba(0,0,0,0)",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: Dimensions.get('window').width - 80
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 30,
        width: Dimensions.get('window').width - 200
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
});