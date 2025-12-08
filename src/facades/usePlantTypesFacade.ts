
import { useShallow } from "zustand/shallow"
import usePlantTypesStore from "../store/usePlantTypesStore"

const usePlantTypesFacade = () => {
    const { plantTypes, loading, error, fetchPlantTypes } = usePlantTypesStore(useShallow((
        (state) => ({
            plantTypes: state.plantTypes,
            loading: state.loading,
            error: state.error,
            fetchPlantTypes: state.fetchPlantTypes,
        })))
    )

    return { plantTypes, loading, error, fetchPlantTypes }
}

export default usePlantTypesFacade