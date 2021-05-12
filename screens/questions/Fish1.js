import React, { useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import BackNext from '../../components/questions/BackNext';
import TwoAnswer from '../../components/questions/TwoAnswer';
import styles from '../../styles/QuestionStyles';

const Fish1 = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  const question = 'Is it alive or dead?';
  const answer1 = 'Alive';
  const answer2 = 'Dead';

  const navigationHandler = (direction) => {
    if (direction === 'back') {
      navigation.navigate('FishOrRedd');
    } else if (selected === answer1) {
      navigation.navigate('FishAlive1');
    } else if (selected === answer2) {
      navigation.navigate('FishDead1');
    } else {
      alert('Please choose an option!');
    }
  };
  return (
    <View style={styles.container}>
      <TwoAnswer
        question={question}
        answer1={answer1}
        answer2={answer2}
        choose={setSelected}
      />
      <BackNext navigationHandler={(direction) => navigationHandler(direction)} />
    </View>
  );
};

Fish1.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

Fish1.defaultProps = {
  navigation: {
    navigate: () => null,
  },
};

export default Fish1;
