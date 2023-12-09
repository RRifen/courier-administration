import {useEffect, useState} from "react";
import axios from "axios";

interface EquipmentType {
    equipment_type_id: number,
    description: string
}

export function useEquipmentsSelect() {
    let [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([]);

    async function fetchEquipmentTypes() {
        try {
            const response = await axios.post(
                "http://localhost:3030/mysql",
                {query: 'SELECT * FROM equipment_types'}
            );
            setEquipmentTypes(response.data.result);
        } catch (e: unknown) {
        }
    }

    useEffect(() => {
        fetchEquipmentTypes();
        return () => {
            setEquipmentTypes([])
        }
    }, [])

    return {equipmentTypes, setEquipmentTypes}
}