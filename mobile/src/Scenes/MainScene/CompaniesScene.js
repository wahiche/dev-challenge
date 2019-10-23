import React, { PureComponent } from 'react';
import { View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { ErrorScene, CompaniesList } from '../../components';

const query = gql`
 query Companies { 
    companies { 
      id 
      name
      color
      image
      employees { 
        name
        image
        id
        friends { 
          name 
          id 
        } 
      } 
    } 
  }
`;

console.log("Query")

export default class CompaniesScene extends PureComponent {
  render() {
    const { navigation } = this.props;

    return (
      <View>
        <Query query={query}>
          {({ loading, error, data }) => {
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error) {
              return <ErrorScene message={error.message} />;
            }
            return (
              <FlatList
                data={data.companies}

                renderItem={({ item }) => (
                  <TouchableOpacity
                    key={data.id}
                    onPress={() =>
                      navigation.navigate('CompanyScene', { id: item.id })
                    }
                  >
                    <CompaniesList companies={item} />
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            );
          }}
        </Query>
      </View>
    )

    // todo: 2. would be cool if we actually queried the graphql server for companies and displayed them here.

  }
}
