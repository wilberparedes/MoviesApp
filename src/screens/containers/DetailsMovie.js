import React, { useEffect, useState } from 'react';
import { View, Text, Animated, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { connect } from 'react-redux';

import { COLORS } from '../../settings/theme';
import URL_MEDIA from '../../../url_media';
import { actions } from '../../store';
import { handleOpenLink } from '../../settings/utils';
import { Loading, Fab, ItemText } from '../components';

const HEADER_MIN_HEIGHT = 90;
const HEADER_MAX_HEIGHT = 300;

const DetailsMovie = ({ navigation, route, getMoviesDetails }) => {

    const [detailsMovie, setDetailsMovie] = useState(null);

    const scrollYAnimatedValue = new Animated.Value(0);

    const headerHeight = scrollYAnimatedValue.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
    });

    const headerBackgroundColor = scrollYAnimatedValue.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: ['rgba(52, 52, 52, 0.8)', '#FFFFFF'],
        extrapolate: 'clamp',
    });

    const HideOpacityHeader = scrollYAnimatedValue.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const ShowOpacityHeader = scrollYAnimatedValue.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });


    const goBack = () => {
        navigation.goBack();
    }

    useEffect(() => {
        getDataMoviesDetails();
    }, [])

    const getDataMoviesDetails = async () => {
        const { params } = route;
        const resp = await getMoviesDetails({movie_id: params.id });
        setDetailsMovie(resp);
    }

    if(!detailsMovie){
        return <Loading />;
    }

    
    const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio","julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const d = new Date(detailsMovie.release_date);
    const genres = detailsMovie.genres.map((d) => { return  d.name }).join(', ');

    return (
        <View style={{backgroundColor: 'white', flex: 1,}}>
            {/* header */}
            <Animated.View
                style={[
                    styles.animatedHeaderContainer,
                    {
                        height: headerHeight,
                        backgroundColor: COLORS.PRIMARY,
                        zIndex: 1,
                    },
                ]}>
                <TouchableWithoutFeedback
                    headerBackgroundColor
                    onPress={goBack}
                    >
                    <Animated.View
                        style={{
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                position: 'absolute',
                                left: 15,
                                top: 40,
                                zIndex: 999,
                                padding: 10,
                                paddingHorizontal: 13,
                                opacity: HideOpacityHeader,
                                elevation : 2,
                                backgroundColor: COLORS.PRIMARY_TRANSPARENT,
                                borderRadius: 30
                            }}>
                        <Icon
                            reverse
                            name='arrow-left'
                            size={20}
                            color={'white'}
                            style={{marginLeft: -3}}
                            />
                    </Animated.View>
                </TouchableWithoutFeedback>

                <Animated.View
                    style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        position: 'absolute',
                        left: 5,
                        top: 30,
                        zIndex: 999,
                        padding: 15,
                        opacity: ShowOpacityHeader,
                        width: wp(100),
                    }}>
                    <TouchableWithoutFeedback
                        headerBackgroundColor
                        onPress={goBack}
                        >
                        <View style={{padding: 5}}>
                            <Icon
                                name='arrow-left'
                                size={20}
                                color={'white'}
                                />
                        </View>
                    </TouchableWithoutFeedback>
                    <Text
                        style={{
                            fontWeight: 'bold',
                            color: 'white',
                            fontSize: 16,
                            marginLeft: 16,
                            marginRight: 25,
                        }}
                        numberOfLines={1}>
                        {detailsMovie.title}
                    </Text>
                </Animated.View>

                <Animated.Image
                    source={{
                        uri: `${URL_MEDIA}${(detailsMovie.backdrop_path ? detailsMovie.backdrop_path : detailsMovie.poster_path)}`,
                    }}
                    style={{
                        width: wp(100),
                        height: headerHeight,
                        opacity: HideOpacityHeader,
                    }}
                />
            </Animated.View>
            {/* FIN HEADER */}

            <ScrollView
                contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT, }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{
                        nativeEvent: {
                        contentOffset: {y: scrollYAnimatedValue},
                        },
                    }],
                    {useNativeDriver: false},
                )}>
                    <View style={{margin: 16, minHeight: 800}}>
                        <Animated.View
                            style={{
                                opacity: HideOpacityHeader,
                                maxWidth: wp(100),
                            }}>
                            <Text style={styles.titlepri} numberOfLines={2}>{detailsMovie.title}</Text>
                            {detailsMovie.tagline != '' && <Text style={{ fontWeight: '500', color: COLORS.TEXT_BLACK, fontSize: 16 }} numberOfLines={2}>{detailsMovie.tagline}</Text>}
                        </Animated.View>


                        <View style={{marginVertical: 10}}>
                            
                            <ItemText
                                title={'Duración:'}
                                description={`${detailsMovie.runtime} min`}
                                />

                            <ItemText
                                title={'Fecha de estreno:'}
                                description={`${d.getDay()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`}
                                />
                            <ItemText
                                title={'Calificación:'}
                                description={`${detailsMovie.vote_average}`}
                                />

                            {(genres != '') && (
                                <ItemText
                                    title={'Géneros:'}
                                    description={`${genres}`}
                                    />
                            )}

                            {(detailsMovie.overview != '') && (
                                <ItemText
                                    title={'Descripción:'}
                                    description={`${detailsMovie.overview}`}
                                    />
                            )}

                        </View>
                        
                    </View>

                    <View style={{height: 80}}/>

            </ScrollView>

            {(detailsMovie && detailsMovie.homepage != "") && (
                <Fab 
                    icon={'external-link-alt'} 
                    onPress={() => handleOpenLink(detailsMovie.homepage)} 
                    />
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    safContainer: { 
        flex: 1 
    },
    animatedHeaderContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 0,
        opacity: 1,
    },
    titlepri: {
        fontWeight: 'bold', 
        color: COLORS.TEXT_BLACK, 
        fontSize: 20
    }
});

const mapDispatchToProps = dispatch => ({
    getMoviesDetails: (value) => 
        dispatch(actions.moviesapi.getMoviesDetails(value)),
});

export default connect(null, mapDispatchToProps)(DetailsMovie);
