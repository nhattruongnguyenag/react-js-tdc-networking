import {
  AutomobileEngineeringDepartment,
  DepartmentOfEnglish,
  DepartmentOfKoreanLanguage,
  FacultyOfAutomationTechnology,
  FacultyOfBusinessAdministration,
  FacultyOfElectricalEngineering,
  FacultyOfFinanceAndAccounting,
  FacultyOfInformationTechnology,
  FacultyOfMechanicalEngineeringAndManufacturing,
  FacultyOfTourism,
  JapaneseLanguageDepartment
} from '../constants/Variables'
import { useTranslation } from 'react-multi-lang'

export const getFacultyTranslated = (name: string, t: ReturnType<typeof useTranslation>): string => {
  let result = ''
  switch (name) {
    case FacultyOfElectricalEngineering:
      result = t('Faculty.FacultyOfElectricalEngineering')
      break
    case FacultyOfInformationTechnology:
      result = t('Faculty.FacultyOfInformationTechnology')
      break
    case FacultyOfAutomationTechnology:
      result = t('Faculty.FacultyOfAutomationTechnology')
      break
    case FacultyOfMechanicalEngineeringAndManufacturing:
      result = t('Faculty.FacultyOfMechanicalEngineeringAndManufacturing')
      break
    case AutomobileEngineeringDepartment:
      result = t('Faculty.AutomobileEngineeringDepartment')
      break
    case FacultyOfFinanceAndAccounting:
      result = t('Faculty.FacultyOfFinanceAndAccounting')
      break
    case FacultyOfBusinessAdministration:
      result = t('Faculty.FacultyOfBusinessAdministration')
      break
    case FacultyOfTourism:
      result = t('Faculty.FacultyOfTourism')
      break
    case DepartmentOfEnglish:
      result = t('Faculty.DepartmentOfEnglish')
      break
    case DepartmentOfKoreanLanguage:
      result = t('Faculty.DepartmentOfKoreanLanguage')
      break
    case JapaneseLanguageDepartment:
      result = t('Faculty.JapaneseLanguageDepartment')
      break
    default:
      return name;
  }
  return result
}
