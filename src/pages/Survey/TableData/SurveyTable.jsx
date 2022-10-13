import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, Empty, message, Popover, Divider } from 'antd';
import TableCommon from '../../../components/common/TableNormal';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { SurveyForm } from './SurveyForm';
import { Checkbox as CheckboxControl, FieldLabel } from '../../../components/controls';
// import { ClosingModal } from "../Modals/ClosingModal";
import { createSurvey, getSurveyDetails, updateSurvey, clearSurvey } from '../../../slices/surveys';
import { isEmpty } from 'lodash';
import { Button, Input } from '../../../components/styles';
import { useSearchParams } from 'react-router-dom';

const CustomerSurveyTable = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [dataTable, setDataTable] = useState([]);
  const [dataTables, setDataTables] = useState([]);
  const [formValue, setFromValue] = useState({});
  const [formValues, setFromValues] = useState([]);
  const [searchParams] = useSearchParams();
  const [apptId, setApptId] = useState(0);
  // const [surveyId, setSurveyId] = useState(0);
  const [open, setOpen] = useState(false);
  const [isReset, setIsReset] = useState(true);

  //get data from redux
  const { surveys, customers, appointment } = useSelector((state) => state);
  const { selectedCustomer } = customers;
  const { survey, isClearSurvey, isHistory } = surveys;
  const { finance, influence, priority, others, ...value } = survey;
  const financeValue = finance ? JSON.parse(finance) : {};
  const influenceValue = influence ? JSON.parse(influence) : {};
  const priorityValue = priority ? JSON.parse(priority) : {};
  const othersValue = others ? JSON.parse(others) : {};

  const methods = useForm({
    mode: 'all',
    defaultValues: {
      other1: [],
      other2: [],
      other3: [],
      other4: [],
      isPotential: false,
      hintName: '',
    },
  });
  const { watch, control, reset } = methods;

  useEffect(() => {
    dispatch(clearSurvey());

    if (selectedCustomer?.customerId && selectedCustomer?.surveyId) {
      dispatch(getSurveyDetails(selectedCustomer?.surveyId));
    }
  }, []);

  useEffect(() => {
    const apptId = searchParams.get('appointment_id');
    const surveyId = searchParams.get('survey_id');

    if (apptId) {
      setApptId(apptId);
    } else {
      setApptId(appointment && appointment.data.length > 0 ? appointment.data[0].apptId : 0);
    }
  }, [searchParams]);

  // Change customer
  useEffect(() => {
    if (selectedCustomer?.customerId) {
      const formInfos = [...formValues];

      setIsReset(true);

      if (formInfos.length === 0) {
        // Get survey
        if (selectedCustomer?.surveyId) {
          dispatch(getSurveyDetails(selectedCustomer?.surveyId));
        }
      } else {
        const isIdExist = formInfos.some((item) => item.customerId === selectedCustomer?.customerId);
        if (!isIdExist && selectedCustomer?.surveyId) {
          dispatch(getSurveyDetails(selectedCustomer?.surveyId));
        }
      }
    }
  }, [selectedCustomer]);

  //back to reset data

  useEffect(() => {
    if (isClearSurvey && formValues?.length > 0) {
      const formInfos = [...formValues];
      const currentIndex = formInfos?.findIndex((item) => item?.customerId === selectedCustomer?.customerId);
      const selectedFormInfo = formInfos[currentIndex];
      selectedFormInfo['hintName'] = '';
      selectedFormInfo['isPotential'] = false;
      selectedFormInfo['others']['other1'] = [];
      selectedFormInfo['others']['other2'] = [];
      selectedFormInfo['others']['other3'] = [];
      selectedFormInfo['others']['other4'] = [];
      formInfos[currentIndex] = selectedFormInfo;
      setFromValues(formInfos);
    }
  }, [isClearSurvey]);

  useEffect(() => {
    if (isHistory) {
      const formValue = generateFormData(selectedCustomer?.customerId, survey);
      const tableValue = generateTableData(selectedCustomer?.customerId, survey);

      setDataTable(tableValue?.data);
      setFromValue(formValue);
      resetForm(formValue);
    } else {
      const tData =
        selectedCustomer?.customerId && dataTables?.length > 0
          ? dataTables?.find((item) => item?.customerId === selectedCustomer?.customerId)
          : {};
      const fData =
        selectedCustomer?.customerId && formValues?.length > 0
          ? formValues?.find((item) => item?.customerId === selectedCustomer?.customerId)
          : {};

      if (!isEmpty(tData)) {
        setDataTable(tData?.data);
      }
      if (!isEmpty(fData)) {
        setFromValue(fData);
        resetForm(fData);
      }
    }
  }, [isHistory]);

  //reset form after submit
  useEffect(() => {
    if (!isEmpty(surveys?.data)) {
      const survey = !isEmpty(surveys?.data) ? surveys.data : {};
      const dataInfos = [...dataTables];
      const formInfos = [...formValues];
      const tableValue = generateTableData(selectedCustomer?.customerId, survey);
      const formValue = generateFormData(selectedCustomer?.customerId, survey);

      const currentIndex = formInfos?.findIndex((item) => item?.customerId === selectedCustomer?.customerId);
      dataInfos[currentIndex] = tableValue;
      formInfos[currentIndex] = formValue;

      setDataTables(dataInfos);
      setFromValues(formInfos);
    }
  }, [surveys?.data]);

  //generate form data
  useEffect(() => {
    const survey = !isEmpty(surveys?.survey) ? surveys.survey : {};
    const formInfos = [...formValues];
    const formValue = generateFormData(selectedCustomer?.customerId, survey);

    reset({
      other1: formValue?.others?.other1,
      other2: formValue?.others?.other2,
      other3: formValue?.others?.other3,
      other4: formValue?.others?.other4,
      isPotential: formValue?.isPotential,
      hintName: formValue?.hintName,
    });

    if (!isHistory && selectedCustomer?.customerId) {
      if (formInfos?.length === 0) {
        formInfos.push(formValue);
      } else {
        const isIdExist = formInfos.some((item) => item?.customerId == selectedCustomer?.customerId);
        if (!isIdExist) {
          formInfos.push(formValue);
        } else {
          const currentIndex = formInfos?.findIndex((item) => item?.customerId === selectedCustomer?.customerId);
          formInfos[currentIndex] = formValue;
        }
      }

      setFromValues(formInfos);
    } else {
      setFromValue(formValue);
    }
  }, [surveys?.survey]);

  useEffect(() => {
    const survey = !isEmpty(surveys?.survey) ? surveys.survey : {};
    const dataInfos = [...dataTables];
    const tableValue = generateTableData(selectedCustomer?.customerId, survey);

    if (!isHistory && selectedCustomer?.customerId) {
      if (dataInfos.length === 0) {
        dataInfos.push(tableValue);
      } else {
        const isIdExist = dataInfos.some((item) => item.customerId === selectedCustomer?.customerId);
        if (!isIdExist) {
          dataInfos.push(tableValue);
        } else {
          const currentIndex = dataInfos?.findIndex((item) => item?.customerId === selectedCustomer?.customerId);
          dataInfos[currentIndex] = tableValue;
        }
      }
      setDataTables(dataInfos);
    } else {
      setDataTable(tableValue?.data);
    }
  }, [surveys?.survey]);

  useEffect(() => {
    const tData =
      selectedCustomer?.customerId && dataTables?.length > 0
        ? dataTables?.find((item) => item?.customerId === selectedCustomer?.customerId)
        : {};

    if (!isEmpty(tData)) {
      setDataTable(tData?.data);
    }
  }, [dataTables]);

  useEffect(() => {
    const fData =
      selectedCustomer?.customerId && formValues?.length > 0
        ? formValues?.find((item) => item?.customerId === selectedCustomer?.customerId)
        : {};
    if (!isEmpty(fData)) {
      setFromValue(fData);
      isReset &&
        reset({
          other1: fData?.others?.other1,
          other2: fData?.others?.other1,
          other3: fData?.others?.other1,
          other4: fData?.others?.other1,
          isPotential: fData?.isPotential,
          hintName: fData?.hintName,
        });
    }
  }, [formValues]);

  //for checkbox group
  const watchOther1 = watch('other1', []);
  const watchOther2 = watch('other2', []);
  const watchOther3 = watch('other3', []);
  const watchOther4 = watch('other4', []);
  const watchPotential = watch('isPotential', false);
  const watchHintName = watch('hintName', '');

  useEffect(() => {
    if (!isHistory && formValues?.length > 0) {
      const formInfos = [...formValues];
      const currentIndex = formInfos?.findIndex((item) => item?.customerId === selectedCustomer?.customerId);
      const selectedFormInfo = formInfos[currentIndex];
      selectedFormInfo['hintName'] = watchHintName;
      selectedFormInfo['isPotential'] = watchPotential;
      selectedFormInfo['others']['other1'] = watchOther1;
      selectedFormInfo['others']['other2'] = watchOther2;
      selectedFormInfo['others']['other3'] = watchOther3;
      selectedFormInfo['others']['other4'] = watchOther4;
      formInfos[currentIndex] = selectedFormInfo;
      console.log(formInfos);

      setFromValues(formInfos);
    }
  }, [watchOther1, watchOther2, watchOther3, watchOther4, watchPotential, watchHintName]);

  const handleCheckboxChangeFactory = (rowIndex, columnKey) => (event) => {
    const tableInfos = [...dataTables];
    const currentIndex = tableInfos.findIndex((item) => item?.customerId === selectedCustomer?.customerId);
    const selectedTableInfo = tableInfos[currentIndex];
    const newCheckboxState = [...selectedTableInfo?.data];

    if (['infulence1', 'infulence2', 'infulence3'].includes(columnKey)) {
      let infulence = '';
      let inful1 = '';
      let inful2 = '';
      let inful3 = '';
      let infulValue = event.target.value;
      if (columnKey === 'infulence1') {
        infulence = infulValue;
        inful1 = infulValue;
      } else if (columnKey === 'infulence2') {
        infulence = infulValue;
        inful2 = infulValue;
      } else if (columnKey === 'infulence3') {
        infulence = infulValue;
        inful3 = infulValue;
      }
      newCheckboxState[rowIndex]['infulence'] = infulence;
      newCheckboxState[rowIndex]['infulence1'] = inful1;
      newCheckboxState[rowIndex]['infulence2'] = inful2;
      newCheckboxState[rowIndex]['infulence3'] = inful3;
    }

    if (['finance1', 'finance2'].includes(columnKey)) {
      let finance = '';
      let finance1 = '';
      let finance2 = '';
      let financeValue = event.target.value;
      if (columnKey === 'finance1') {
        finance = financeValue;
        finance1 = financeValue;
      } else if (columnKey === 'finance2') {
        finance = financeValue;
        finance2 = financeValue;
      }
      newCheckboxState[rowIndex]['finance'] = finance;
      newCheckboxState[rowIndex]['finance1'] = finance1;
      newCheckboxState[rowIndex]['finance2'] = finance2;
    }

    selectedTableInfo['data'] = newCheckboxState;
    tableInfos[currentIndex] = selectedTableInfo;
    setDataTables(tableInfos);
  };

  const handleInput = (rowIndex, columnKey) => (event) => {
    const tableInfos = [...dataTables];
    const currentIndex = tableInfos.findIndex((item) => item.customerId === selectedCustomer?.customerId);
    const selectedTableInfo = tableInfos[currentIndex];
    const newCheckboxState = [...selectedTableInfo?.data];
    newCheckboxState[rowIndex][columnKey] = event.target.value;
    selectedTableInfo['data'] = newCheckboxState;
    tableInfos[currentIndex] = selectedTableInfo;
    setDataTables(tableInfos);
  };

  const columns = [
    {
      title: 'Nền tảng của sự giàu có',
      dataIndex: 'type',
      // width: "25%",
      fixed: 'left',
    },
    {
      title: 'Mức độ ảnh hưởng',
      // width: "33%",
      children: [
        {
          title: 'Rất quan trọng',
          children: [
            {
              dataIndex: 'infulence1',
              className: 'textaline',
              width: '5rem',
              render: (value, record, rowIndex) => (
                <Checkbox checked={value} value="1" onChange={handleCheckboxChangeFactory(rowIndex, 'infulence1')} />
              ),
            },
          ],
        },
        {
          title: 'Quan trọng',
          children: [
            {
              dataIndex: 'infulence2',
              className: 'textaline',
              width: '5rem',
              render: (value, record, rowIndex) => (
                <Checkbox checked={value} value="2" onChange={handleCheckboxChangeFactory(rowIndex, 'infulence2')} />
              ),
            },
          ],
        },
        {
          title: 'Ít quan trọng',
          children: [
            {
              dataIndex: 'infulence3',
              className: 'textaline',
              width: '5rem',
              render: (value, record, rowIndex) => (
                <Checkbox
                  className="radius-5"
                  checked={value}
                  value="3"
                  onChange={handleCheckboxChangeFactory(rowIndex, 'infulence3')}
                />
              ),
            },
          ],
        },
      ],
    },
    {
      title: 'Xây dựng vương quốc tài chính',
      // width: "34%",
      children: [
        {
          title: 'Chưa có',
          children: [
            {
              dataIndex: 'finance1',
              className: 'textaline',
              width: '5rem',
              render: (value, record, rowIndex) => (
                <Checkbox
                  className="radius-5"
                  checked={value}
                  value="1"
                  onChange={handleCheckboxChangeFactory(rowIndex, 'finance1')}
                />
              ),
            },
          ],
        },
        {
          title: 'Đã có',
          children: [
            {
              dataIndex: 'finance2',
              className: 'textaline',
              width: '6rem',
              render: (value, record, rowIndex) => (
                <Checkbox
                  className="radius-5"
                  checked={value}
                  value="2"
                  onChange={handleCheckboxChangeFactory(rowIndex, 'finance2')}
                />
              ),
            },
          ],
        },
        {
          title: 'Số tiền (1000đ)',
          children: [
            {
              dataIndex: 'money',
              className: 'textaline',
              width: '5rem',
              render: (value, record, rowIndex) => (
                <Input size="large" value={value} onChange={handleInput(rowIndex, 'money')} />
              ),
            },
          ],
        },
      ],
    },
    {
      title: 'TT ưu tiên',
      dataIndex: 'prior',
      width: '5rem',
      render: (value, record, rowIndex) => (
        <Input
          // style={{ backgroundColor: "#F8F8F8", border: 0 }}
          className="radius-10 "
          size="large"
          value={value}
          onChange={handleInput(rowIndex, 'prior')}
        />
      ),
    },
  ];

  const table = useMemo(() => {
    if (!!dataTable && dataTable.length > 0) {
      return <TableCommon dataSource={dataTable} columnTable={columns} bordered></TableCommon>;
    } else {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }
  }, [dataTable]);

  const onSubmit = () => {
    console.log(dataTable);
    const familyData = dataTable.find((data) => data.label === 'family');
    const bachelorData = dataTable.find((data) => data.label === 'bachelor');
    const sonData = dataTable.find((data) => data.label === 'son');
    const retireData = dataTable.find((data) => data.label === 'retire');
    const doubleAssetData = dataTable.find((data) => data.label === 'doubleAsset');

    const submitFormData = {
      apptId: +apptId,
      customerId: +selectedCustomer?.customerId,
      // surveyId: 0,
      influence: {
        family: familyData?.infulence,
        bachelor: bachelorData?.infulence,
        son: sonData?.infulence,
        retire: retireData?.infulence,
        doubleAsset: doubleAssetData?.infulence,
      },
      finance: {
        family: {
          ans1: familyData?.finance,
          ans2: familyData?.money,
        },
        bachelor: {
          ans1: bachelorData?.finance,
          ans2: bachelorData?.money,
        },
        son: {
          ans1: sonData?.finance,
          ans2: sonData?.money,
        },
        retire: {
          ans1: retireData?.finance,
          ans2: retireData?.money,
        },
        doubleAsset: {
          ans1: doubleAssetData?.finance,
          ans2: doubleAssetData?.money,
        },
      },
      others: {
        ans1: formValue?.others?.other1 ? formValue.others.other1.toString() : '',
        ans2: formValue?.others?.other2 ? formValue.others.other2.toString() : '',
        ans3: formValue?.others?.other3 ? formValue.others.other3.toString() : '',
        ans4: formValue?.others?.other4 ? formValue.others.other4.toString() : '',
      },
      prior: {
        family: +familyData?.prior,
        bachelor: +bachelorData?.prior,
        son: +sonData?.prior,
        retire: +retireData?.prior,
        doubleAsset: +doubleAssetData?.prior,
      },
      hintName: formValue?.hintName,
      isPotential: formValue?.isPotential,
    };
    console.log(submitFormData);
    if (formValue?.hintName) {
      setOpen(false);
      if (!formValue.surveyId) {
        dispatch(createSurvey(submitFormData));
      } else {
        dispatch(updateSurvey({ id: formValue.surveyId, data: submitFormData }));
      }
    } else {
      message.error('Bạn chưa nhập tên gợi nhớ');
    }
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const onCancel = () => {
    setOpen(false);
  };

  const resetForm = (formData) => {
    reset({
      other1: formData?.others?.other1,
      other2: formData?.others?.other1,
      other3: formData?.others?.other1,
      other4: formData?.others?.other1,
      isPotential: formData?.isPotential,
      hintName: formData?.hintName,
    });
  };

  const content = (
    <div className="closing-container">
      <div className="closing-body">
        <div className="form-group">
          <FieldLabel name="hintName" label="Tên gợi nhớ" />
          <Controller
            control={control}
            name="hintName"
            render={({ field }) => <Input {...field} className="form-control" />}
          ></Controller>
        </div>
      </div>
      <Divider />
      <div className="closing-footer">
        <div className="closing-btn">
          <Button htmlType="button" className="btn-danger" block onClick={onCancel} onBlur={onCancel}>
            Hủy
          </Button>
        </div>

        <div className="closing-btn">
          <Button type="primary" htmlType="button" className="btn-primary" block onClick={onSubmit}>
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <FormProvider {...methods}>
      <form className="form-survey">
        <div>
          <h2 className="title">{t('survey.formTitle.title1')}</h2>
          <div className="">{table}</div>
        </div>
        <SurveyForm />
        <div className={`container-right-submit`}>
          <div>
            <CheckboxControl control={control} name="isPotential" label="Không còn tiềm năng" />
          </div>
          {selectedCustomer?.customerId && !surveys?.isHistory && (
            <div>
              <Popover
                placement="bottomRight"
                content={content}
                trigger="click"
                onOpenChange={handleOpenChange}
                overlayClassName="closing-popover"
                visible={open}
              >
                <Button type="primary" htmlType="button" className="btn-primary finance-btn-small" block>
                  {t('survey.save')}
                </Button>
              </Popover>
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default CustomerSurveyTable;

const generateTableData = (customerId, survey = {}) => {
  // console.log(survey)
  const priorityValue = !isEmpty(survey) ? JSON.parse(survey.priority) : {};
  const financeValue = !isEmpty(survey) ? JSON.parse(survey.finance) : {};
  const influenceValue = !isEmpty(survey) ? JSON.parse(survey.influence) : {};

  return {
    surveyId: !isEmpty(survey) ? survey.surveyId : 0,
    customerId: customerId,
    data: [
      {
        key: 1,
        type: 'Quỹ dự phòng đảm bảo tài chính cho người mà anh/chị yêu thương',
        infulence: influenceValue?.family,
        infulence1: influenceValue?.family === '1' ? '1' : '',
        infulence2: influenceValue?.family === '2' ? '2' : '',
        infulence3: influenceValue?.family === '3' ? '3' : '',
        finance: financeValue?.family?.ans1,
        finance1: financeValue?.family?.ans1 === '1' ? '1' : '',
        finance2: financeValue?.family?.ans1 === '2' ? '2' : '',
        money: financeValue?.family?.ans2,
        prior: priorityValue?.family,
        label: 'family',
      },
      {
        key: 2,
        type: 'Quỹ đảm bảo hoàn thành bậc cử nhân',
        infulence: influenceValue?.bachelor,
        infulence1: influenceValue?.bachelor === '1' ? '1' : '',
        infulence2: influenceValue?.bachelor === '2' ? '2' : '',
        infulence3: influenceValue?.bachelor === '3' ? '3' : '',
        finance: financeValue?.bachelor?.ans1,
        finance1: financeValue?.bachelor?.ans1 === '1' ? '1' : '',
        finance2: financeValue?.bachelor?.ans1 === '2' ? '2' : '',
        money: financeValue?.bachelor?.ans2,
        prior: priorityValue?.bachelor,
        label: 'bachelor',
      },
      {
        key: 3,
        type: 'Quỹ khởi nghiệp chắp cánh cho con vào đời',
        infulence: influenceValue?.son,
        infulence1: influenceValue?.son === '1' ? '1' : '',
        infulence2: influenceValue?.son === '2' ? '2' : '',
        infulence3: influenceValue?.son === '3' ? '3' : '',
        finance: financeValue?.son?.ans1,
        finance1: financeValue?.son?.ans1 === '1' ? '1' : '',
        finance2: financeValue?.son?.ans1 === '2' ? '2' : '',
        money: financeValue?.son?.ans2,
        prior: priorityValue?.son,
        label: 'son',
      },
      {
        key: 4,
        type: 'Quỹ lương hưu từ năm 61-85 tuổi',
        infulence: influenceValue?.retire,
        infulence1: influenceValue?.retire === '1' ? '1' : '',
        infulence2: influenceValue?.retire === '2' ? '2' : '',
        infulence3: influenceValue?.retire === '3' ? '3' : '',
        finance: financeValue?.retire?.ans1,
        finance1: financeValue?.retire?.ans1 === '1' ? '1' : '',
        finance2: financeValue?.retire?.ans1 === '2' ? '2' : '',
        money: financeValue?.retire?.ans2,
        prior: priorityValue?.retire,
        label: 'retire',
      },
      {
        key: 5,
        type: 'Quỹ đầu tư gấp đôi tài sản',
        infulence: '',
        infulence1: influenceValue?.doubleAsset === '1' ? '1' : '',
        infulence2: influenceValue?.doubleAsset === '2' ? '2' : '',
        infulence3: influenceValue?.doubleAsset === '3' ? '3' : '',
        finance: financeValue?.doubleAsset?.ans1,
        finance1: financeValue?.doubleAsset?.ans1 === '1' ? '1' : '',
        finance2: financeValue?.doubleAsset?.ans2 === '2' ? '2' : '',
        money: financeValue?.doubleAsset?.ans2,
        prior: priorityValue?.doubleAsset,
        label: 'doubleAsset',
      },
    ],
  };
};

const generateFormData = (customerId, survey = {}) => {
  // console.log(survey)
  const others = !isEmpty(survey) && survey.others ? JSON.parse(survey.others) : {};

  return {
    surveyId: !isEmpty(survey) ? survey.surveyId : 0,
    customerId: customerId,
    others: {
      other1: !isEmpty(others) ? others.ans1.split(',') : [],
      other2: !isEmpty(others) ? others.ans2.split(',') : [],
      other3: !isEmpty(others) ? others.ans3.split(',') : [],
      other4: !isEmpty(others) ? others.ans4.split(',') : [],
    },
    hintName: !isEmpty(survey) ? survey.hintName : '',
    isPotential: !isEmpty(survey) ? survey.isPotential : false,
  };
};
