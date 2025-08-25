import { Button, ButtonText, Button as GluestackButton } from '@/components/ui/button';
import { ImagePickerAsset, launchImageLibraryAsync } from 'expo-image-picker';
import React, { Dispatch, SetStateAction, useRef } from 'react';
import {
    View,
    Image,
    Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width: viewportWidth } = Dimensions.get('window');

type ImageCarouselType = {
    images: ImagePickerAsset[] | string[]
    updateImages?: Dispatch<SetStateAction<ImagePickerAsset[]>>
    previewOnly?: boolean
}

const ImageCarousel: React.FC<ImageCarouselType> = ({ images, updateImages, previewOnly = false }) => {
    const carouselRef = useRef(null);

    const pickImage = async () => {
        let result = await launchImageLibraryAsync({
            mediaTypes: ['images'],
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true,
        });
        if (!result.canceled && updateImages) {
            updateImages(result.assets);
        }
    };

    const removeImage = (imageUri: string) => {
        //@ts-ignore
        updateImages(images.filter((value) => value.uri !== imageUri))
    }

    const renderCarouselItem = ({ item, index }: { item: any, index: number }) => {
        const imageUrl = typeof item === 'string' ? item : item.uri;

        return (
            <View
                key={`${index}-${imageUrl}`}
                className={`bg-white rounded-lg p-3 w-full h-[30vh] items-center justify-center shadow-md`}
            >
                <Image className='w-full h-full rounded-lg' source={{ uri: imageUrl }} />

                {!previewOnly && (
                    <Button className='absolute bottom-10 right-10'
                        onPress={() => removeImage(imageUrl)}
                    >
                        <ButtonText>
                            <FontAwesome name='trash' size={20} color="error" />
                        </ButtonText>
                    </Button>
                )}
            </View>
        );
    };

    return (
        <View className='items-center'>
            {images.length > 0 ? (
                <Carousel
                    ref={carouselRef}
                    data={images}
                    renderItem={renderCarouselItem}
                    sliderWidth={viewportWidth * 0.9}
                    itemWidth={viewportWidth * 0.8}
                    inactiveSlideScale={0.9}
                    inactiveSlideOpacity={0.7}
                    enableSnap={true}
                    loop={false}
                    layout={'default'}
                    pagingEnabled={true}

                />
            ) : (

                !previewOnly && (
                    <GluestackButton onPress={pickImage} className="mx-20 rounded-lg bg-white border-2 border-primaryGreen" size="lg" variant="outline">
                        <FontAwesome name='upload' size={20} color={"#14905C"} />
                        <ButtonText className="color-primaryGreen font-helvetica">Add photos</ButtonText>
                    </GluestackButton>
                )
            )}
        </View>
    );
};

export default ImageCarousel;