import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';

const Details = ({caption}: any) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => null}>
        <Text style={tw`text-white`}>{caption}</Text>
      </TouchableOpacity>
      <View style={tw`flex-row items-center mt-1`}>
        <Icon style={tw`text-white text-lg`} name="music" />
        <Text style={tw`text-white`}> engineeringwala01 • Original audio</Text>
      </View>
    </View>
  );
};

export default Details;
