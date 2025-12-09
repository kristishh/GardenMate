import { SinglePlantProps } from "../navigation"
import { useEffect, useMemo } from "react";
import usePlantsFacade from "../facades/usePlantsFacade";
import React from 'react';
import PlantDetails from "../components/singlePlant/PlantDetails";

const SinglePlant = ({ route, navigation }: SinglePlantProps) => {
    const { plantsWithImages } = usePlantsFacade()
    const { id, title } = route.params
    const plant = useMemo(() => {
        return plantsWithImages.find(plant => plant.id == id)
    }, [id, plantsWithImages])

    useEffect(() => {
        navigation.setOptions({
            title: title,
            headerBackTitle: 'Home',
            headerBackVisible: true
        })
    }, [navigation, id])

    if(!plant) return
    
 return (
    <PlantDetails {...{plant}} />
 )
}

export default SinglePlant