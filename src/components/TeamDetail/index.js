import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';

import Image from 'react-native-scalable-image';

import { Spinner } from '../Spinner';
import { Error } from '../Error';

import { width } from '../../config/Metrics';
import styles from './styles';

export default class TeamDetail extends Component {
  state = {
    isLoading: false,
    isError: false
  };

  componentDidMount() {
    this.requestTeamInfo();
  }

  getImageApi(image) {
    return image
      ? { uri: `https://image.tmdb.org/t/p/w500/${image}` }
      : require('../../assets/images/not_found.png');
  }

  getAge(birthday) {
    if (birthday) {
      var today = new Date();
      var birthDate = new Date(birthday);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
      return `${age} years`;
    }
    return 'Uninformed age';
  }

  requestTeamInfo = async () => {
    const { credit_id } = this.props;

    try {
      this.setState({ isLoading: true });

      let response = await fetch(
        `https://api.themoviedb.org/3/person/${parseInt(
          credit_id
        )}?api_key=024d69b581633d457ac58359146c43f6&language=es-ES`
      );
      let data = await response.json();

      this.setState({
        isLoading: false,
        isError: false,
        profile_path: data.profile_path || '',
        name: data.name || 'No informado',
        known_for_department:
          data.known_for_department || 'Desconocido',
        birthday: data.birthday || '',
        place_of_birth: data.place_of_birth || 'No informado',
        biography: data.biography || 'Sin datos'
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        isError: true
      });
    }
  };

  render() {
    const { actionClose } = this.props;
    const {
      isLoading,
      isError,
      profile_path,
      name,
      known_for_department,
      birthday,
      place_of_birth,
      biography
    } = this.state;

    return (
      <View style={styles.containerModal}>
        {isLoading ? (
          <Spinner style={styles.containerCenter} />
        ) : isError ? (
          <View style={styles.containerModal}>
            <ScrollView style={styles.containerScroll}>
              <Error icon="alert-octagon" action={this.requestTeamInfo} />
            </ScrollView>
            <View style={styles.containerRow}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.button}
                onPress={actionClose}
              >
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.containerModal}>
            <ScrollView style={styles.containerScroll}>
              <View style={styles.containerMainText}>
                <Image
                  source={this.getImageApi(profile_path)}
                  style={styles.photo}
                  width={width * 0.33}
                />
                <View style={styles.textItens}>
                  <Text style={styles.titleName}>{name}</Text>
                  <View style={styles.containerTitleMargin}>
                    <Text
                      numberOfLines={2}
                      style={[styles.textSmall, styles.textJustify]}
                    >
                      {known_for_department}
                    </Text>
                  </View>
                  <View style={styles.containerTitleMargin}>
                    <Text
                      numberOfLines={2}
                      style={[styles.textSmall, styles.textJustify]}
                    >
                      {this.getAge(birthday)}
                    </Text>
                  </View>
                  <View style={styles.containerTitleMargin}>
                    <Text
                      numberOfLines={2}
                      style={[styles.textSmall, styles.textJustify]}
                    >
                      {place_of_birth}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.titleInfo}>Biografía</Text>
              <Text
                style={[
                  styles.textSmall,
                  styles.textLineHeight,
                  styles.textJustify
                ]}
              >
                {biography}
              </Text>
            </ScrollView>
            <View style={styles.containerRow}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.button}
                onPress={actionClose}
              >
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}
