import React from 'react';
import { FeeFineOwnerDTO } from '../../api/useFeeFineOwners';
import { FeeFineTypeDTO } from '../../api/useFeeFineTypes';
import { LocationDTO } from '../../api/useLocations';
import { PatronGroupDTO } from '../../api/usePatronGroups';
import { ServicePointDTO } from '../../api/useServicePoints';
import CriteriaCard from '../../components/CriteriaCard';

export default function CriteriaMenu() {
  return <CriteriaCard prefix="criteria." root />;
}
