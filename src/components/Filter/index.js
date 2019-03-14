import React, { Component } from 'react';	
import { View, Text, ScrollView, Switch, TouchableOpacity } from 'react-native';

import styles from './styles';

export default class Filter extends Component {
  state = {
    filter: this.props.filterType,
    name: this.props.filterName,
    actionFilter: this.props.actionFilter,
    actionSwitchMovie: this.props.actionSwitchMovie
  };

  changeValues = (filter, name) => {
    this.setState({ filter, name });
  };

  render() {
    const { filter, name, actionFilter, actionSwitchMovie } = this.state;

    return (
      <View style={styles.containerModal}>
        <Text style={styles.modalTitle}>Filtros</Text>
        <ScrollView>
          <View style={styles.containerScroll}>
            <View style={styles.containerSection}>
              <Text style={styles.optionSectionTitle} numberOfLines={2}>
                Fecha
              </Text>
              <View style={styles.containerRow}>
                <Text style={styles.optionTitle} numberOfLines={2}>
                  Estrenos
                </Text>
                <Switch
                  trackColor={{ false: '#e9e9e9', true: '#47525E' }}
                  onValueChange={() =>
                    this.changeValues('release_date.desc', 'Estrenos')
                  }
                  value={filter === 'release_date.desc' ? true : false}
                />
              </View>
              <View style={styles.containerRow}>
                <Text style={styles.optionTitle} numberOfLines={2}>
                  Antiguas
                </Text>
                <Switch
                  trackColor={{ false: '#e9e9e9', true: '#47525E' }}
                  onValueChange={() =>
                    this.changeValues('release_date.asc', 'Antiguas')
                  }
                  value={filter === 'release_date.asc' ? true : false}
                />
              </View>
            </View>
            <View style={styles.containerSection}>
              <Text style={styles.optionSectionTitle} numberOfLines={2}>
                Popularidad
              </Text>
              <View style={styles.containerRow}>
                <Text style={styles.optionTitle} numberOfLines={2}>
                  Más vistas
                </Text>
                <Switch
                  trackColor={{ false: '#e9e9e9', true: '#47525E' }}
                  onValueChange={() =>
                    this.changeValues('popularity.desc', 'Más vistas')
                  }
                  value={filter === 'popularity.desc' ? true : false}
                />
              </View>
              <View style={styles.containerRow}>
                <Text style={styles.optionTitle} numberOfLines={2}>
                  Menos vistas
                </Text>
                <Switch
                  trackColor={{ false: '#e9e9e9', true: '#47525E' }}
                  onValueChange={() =>
                    this.changeValues('popularity.asc', 'Menos vistas')
                  }
                  value={filter === 'popularity.asc' ? true : false}
                />
              </View>
            </View>
            <View>
              <Text style={styles.optionSectionTitle} numberOfLines={2}>
                Ingresos
              </Text>
              <View style={styles.containerRow}>
                <Text style={styles.optionTitle} numberOfLines={2}>
                  Con mayores ingresos
                </Text>
                <Switch
                  trackColor={{ false: '#e9e9e9', true: '#47525E' }}
                  onValueChange={() =>
                    this.changeValues('revenue.desc', 'Con mayores ingresos')
                  }
                  value={filter === 'revenue.desc' ? true : false}
                />
              </View>
              <View style={styles.containerRow}>
                <Text style={styles.optionTitle} numberOfLines={2}>
                  De bajo costo
                </Text>
                <Switch
                  trackColor={{ false: '#e9e9e9', true: '#47525E' }}
                  onValueChange={() =>
                    this.changeValues('revenue.asc', 'De bajo costo')
                  }
                  value={filter === 'revenue.asc' ? true : false}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.containerButton}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.button, styles.buttonClose]}
            onPress={actionFilter}
          >
            <Text style={[styles.buttonText, styles.buttonTextClose]}>
              Cerrar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[styles.button, styles.buttonSave]}
            onPress={() => actionSwitchMovie(filter, name, false)}
          >
            <Text style={[styles.buttonText, styles.buttonTextSave]}>
              Filtrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
