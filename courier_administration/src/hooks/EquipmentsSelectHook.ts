import {useEffect, useState} from "react";
import axios from "axios";
import {node_mysql} from "../data/API";

interface EquipmentType {
    equipment_type_id: number,
    description: string
}

export function useEquipmentsSelect() {
    let [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([]);

    async function fetchEquipmentTypes() {
        try {
            const response = await axios.post(
                node_mysql,
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