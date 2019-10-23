import React, { PureComponent } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { ErrorScene, UserList } from '../../components';

const styles = StyleSheet.create({
  company: {
    flex: 1,
  },
  banner: {
    display: 'flex',
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 24,
    color: 'white',
    padding: 20
  },
  companyHeader: {
    backgroundColor: 'white',
    padding: 20,
    fontSize: 24,
    color: 'black',
    textAlign: 'center'
  }
});

const query = gql`
  query Company($id: ID!) {
    company(id: $id) {
      name
      color
      image
      employees {
        name
      }
    }
  }
`;

const users = gql`
  query Users {
    users {
      id
      color
      name
      email
      image
    }
  }
`

export default class CompanyScene extends PureComponent {
  render() {
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    // todo: 2. would be really cool to show the company info here.
    // todo: 3. would be extra cool to show the employee list and make it navigate to that user on tap.
    return (

      <Query query={query} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <ActivityIndicator />;
          }

          if (error) {
            return <ErrorScene message={error.message} />;
          }
          return (
            <View style={styles.company}>
              <View>
                <View style={styles.banner}>
                  <Image source={{ uri: data.company.image, width: 80, height: 80 }} />
                  <Text style={[styles.companyHeader, { color: data.company.color, flexGrow: 1, height: '100%' }]}>
                    {data.company.name}
                  </Text>
                </View>
              </View>
              <Text style={[styles.sectionTitle, { backgroundColor: data.company.color }]}>
                Employees
                </Text>
              <ScrollView>
                <Query query={users}>
                  {({ loading, error, data }) => {
                    if (loading) {
                      return <ActivityIndicator />;
                    }

                    if (error) {
                      return <ErrorScene message={error.message} />;
                    }
                    return (
                      <View>
                        <FlatList
                          data={data.users}

                          renderItem={({ item }) => (
                            <TouchableOpacity
                              key={data.id}
                              onPress={() =>
                                navigation.navigate('UserScene', { id: item.id })
                              }
                            >
                              <UserList user={item} />
                            </TouchableOpacity>
                          )}
                          keyExtractor={(item, index) => index.toString()}
                        />
                      </View>
                    )
                  }}
                </Query>
              </ScrollView>
            </View>
          );
        }
        }
      </Query >

    )

  }
}
