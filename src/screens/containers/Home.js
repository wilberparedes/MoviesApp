import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { actions } from '../../store';
import { HeaderHome, Card, Loading } from '../components';

const Home = ({ getMovies, navigation }) => {

    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        getDataMovies();
    }, []);

    const getDataMovies = async () => {
        if((maxPage && page < maxPage) || !maxPage){
            const response = await getMovies({ page });
            
            setMaxPage(response.total_pages);
            const oldData = data ? data.results : [];
            let newData;
            if(data && response.page > data.page){
                const newResult = oldData.concat(response.results);
                newData = { ...response, results: newResult};
            }
            else 
                newData = response;
            setData(newData);
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setData([]);
        setPage(1);
        setIsFetching(true);
        await getDataMovies();
        setIsFetching(false);
    }

    const handleLoadMore = () => {
        setLoadingMore(true);
        setPage(prevPage => prevPage + 1 );
        getDataMovies();
    };

    
    const Footer = () => {
        if (!loadingMore) return null;
        return <Loading />;
    };

    const openDetailsItem = (data) => {
        navigation.push('DetailsMovie', {...data});
     }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <HeaderHome />
            {(loading || isFetching) ?
                (
                    <Loading />
                )
                : (
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
                                onPress={() => openDetailsItem(item)}
                                />
                        )}
                        ListEmptyComponent={<View style={{alignItems: 'center', justifyContent: 'center', padding: 16}}><Text style={{fontSize: 18}}>No se encontraron registros</Text></View>}
                        ListFooterComponent={Footer()}
                        />
                )
            }
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
        </View>
    )
}

const mapDispatchToProps = dispatch => ({
    getMovies: (value) => 
        dispatch(actions.moviesapi.getMovies(value)),
});

export default connect(null, mapDispatchToProps)(Home);
