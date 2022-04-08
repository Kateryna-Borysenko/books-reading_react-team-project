// import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from '../Datepicker/Datepicker';
import s from './Alldatepicker.module.scss';

const Alldatepicker = ({ setTrainingList, trainingList}) => {
  //////////////datepickerfooUSetosendtoapi
  // const [trainingData, setTrainingData] = useState({
  //   startDate: '',
  //   endDate: '',
  //   books: [],
  // });
  const setStartDate = startDate => {
    setTrainingList(prev => ({ ...prev, startDate }));
  };
  const setEndDate = endDate => {
    setTrainingList(prev => ({ ...prev, endDate }));
  };
  //////////////////endofdatepickerfoo
  console.log(trainingList.startDate);
  return (
    <>
      <div className={s.container}>
        <span className={s.item_container}>

          <DatePicker placeholder="Початок" setDate={setStartDate} isDate={(!!trainingList.startDate)} />
        </span>
        <span className={s.item_container}>
          <DatePicker placeholder="Завершення" setDate={setEndDate} isDate={(!!trainingList.endDate)}/>

        </span>
      </div>
    </>
  );
};
export default Alldatepicker;
