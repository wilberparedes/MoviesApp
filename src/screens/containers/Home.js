import React, { useEffect, useState } from 'react'
import { View, Text, StatusBar, FlatList, ImageBackground, Image, RefreshControl, ActivityIndicator } from 'react-native'
import HeaderHome from '../components/HeaderHome'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { actions } from '../../store';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../../settings/theme';
import Card from '../components/Card';

const Home = ({ getMovies }) => {

    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(null)
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        getDataMovies()
    }, [])

    const getDataMovies = async () => {
        if(maxPage && page < maxPage){
            const response = await getMovies({ page });
            setMaxPage(response.total_pages)
            const oldData = data ? data.results : [];
            let newData;
            if(data && response.page > data.page){
                const newResult = oldData.concat(response.results);
                newData = { ...response, results: newResult}
            }
            else 
                newData = response;
            setData(newData)
            console.log(newData)
        }
        setLoading(false)
    }

    const onRefresh = async () => {
        setData([]);
        setPage(1)
        setIsFetching(true)
        await getDataMovies();
        setIsFetching(false)
    }

    const handleLoadMore = () => {
        setLoadingMore(true);
        setPage(prevPage => prevPage + 1 )
        getDataMovies();
    };

    const Footer = () => {
        if (!loadingMore) return null;
    
        return (
          <View
            style={{
              position: 'relative',
              width: wp(100),
              paddingVertical: 10,
              marginVertical: 10,
            }}
          >
            <ActivityIndicator animating size="large" color={COLORS.PRIMARY}/>
          </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <HeaderHome />

            <FlatList
                contentContainerStyle={{
                    margin: 4,
                    justifyContent: 'space-between',
                    padding: 0,
                    marginBottom: 40
                }}
                onRefresh={() => onRefresh()}
                refreshing={isFetching}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                // initialNumToRender={20}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                keyExtractor={item => item.id}
                data={data ? data.results : []}
                numColumns={2}
                renderItem={({ item }) => (
                    <Card
                        image={item.poster_path}
                        title={item.original_title}
                        date={item.release_date}
                        average={item.vote_average}
                        />
                )}
                ListEmptyComponent={<View style={{alignItems: 'center', justifyContent: 'center', padding: 16}}><Text style={{fontSize: 18}}>No se encontraron registros</Text></View>}
                ListFooterComponent={Footer()}
                />


            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
        </View>
    )
}

const mapDispatchToProps = dispatch => ({
    getMovies: (value) => 
        dispatch(actions.moviesapi.getMovies(value)),
});

export default connect(null, mapDispatchToProps)(Home);
