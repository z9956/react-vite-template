import React, { useState } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { Button, Col, Form, Modal, Row, Select } from 'antd';
import styles from '@/pages/settlement/chargeItem/components/ChargeItemAddModal/index.less';
import selectOption from '@/components/SelectOption';
import { getOfficeByBalance, getOfficeCodeList } from '@/pages/settlement/charge/service';
import { getDepartmentList } from '@/pages/settlement/settlementAuthority/service';

const { Option } = Select;

const AddSettlementAuthority = ({
  handleCancel,
  handleOk,
  accountsList,
  userList,
  // departList,
  officeCodeList,
}) => {
  const [form] = Form.useForm();

  const [departList, setDepartList] = useState([]);

  // const [officeCodeList, setOfficeCodeList] = useState([]);

  const handleConfirm = () => {
    try {
      form.validateFields().then(values => {
        const depart = departList.find(item => item.code === values.deptCode);

        if (depart) {
          values.deptName = depart.name;
        }

        const accountsCodeList = values.accountsCodeList;
        if (accountsCodeList) {
          values.accountsCodeList = [accountsCodeList];
        }

        handleOk({ ...values, id: null });
      });
    } catch (e) {
      console.error('AddSettlementAuthority handleConfirm', e);
    }
  };

  const handleOfficeCodeChange = code => {
    form.setFieldsValue({ deptCode: '' });

    if (code) {
      const coId = officeCodeList.find(item => item.code === code)?.id;

      if (coId) {
        getDepartmentList({ coId }).then(res => {
          setDepartList(Array.isArray(res?.data) ? res.data : []);
        });
      } else {
        setDepartList([]);
      }
    }
  };

  return (
    <Modal
      destroyOnClose
      title={`${formatMessage({ id: 'tmplprint.add' })}`}
      visible={true}
      onOk={handleOk}
      onCancel={handleCancel}
      width="55%"
      footer={null}
      maskClosable={false}
    >
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} form={form}>
        <Row>
          <Col span={16}>
            <Form.Item
              label={formatMessage({ id: 'settlementAuthority.userName' })}
              name={'userName'}
              rules={[{ required: true }]}
            >
              <Select allowClear showSearch>
                {userList &&
                  userList.map(item => {
                    return (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Form.Item
              label={`${formatMessage({ id: 'addSettlementAuthority.officeCode' })}`}
              name="officeCode"
              rules={[
                {
                  required: true,
                  message: `${formatMessage({ id: 'virtual.warehouse.tip.select' })}`,
                },
              ]}
            >
              {selectOption(
                officeCodeList,
                'id',
                'code',
                {
                  mode: 'multiple',
                  allowClear: true,
                  showSearch: true,
                  onChange: handleOfficeCodeChange,
                },
                {
                  width: '100%',
                },
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Form.Item
              label={formatMessage({ id: 'settlementAuthority.accountsCode' })}
              name={'accountsCodeList'}
              rules={[{ required: true }]}
            >
              <Select allowClear showSearch>
                {accountsList &&
                  accountsList.map(item => {
                    return (
                      <Option key={item.code} value={item.code}>
                        {item.nameCn}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {/*<Row>
          <Col span={16}>
            <Form.Item
              label={formatMessage({ id: 'settlementCharge.deptName' })}
              name={'deptCode'}
              rules={[{ required: true }]}
            >
              <Select
                allowClear
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {departList &&
                  departList.map(item => {
                    return (
                      <Option key={item.code} value={item.code}>
                        {item.name}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>
          </Col>
        </Row>*/}
        <Row gutter={24} className={styles.modal_row}>
          <Col span={24}>
            <div className={styles.modal_bottom_btn}>
              <span className={styles.btn}>
                <Button type="primary" onClick={handleCancel}>
                  {`${formatMessage({ id: 'tmplprint.cancel' })}`}
                </Button>
              </span>
              <span className={styles.btn}>
                <Button type="primary" onClick={handleConfirm}>
                  {`${formatMessage({ id: 'tmplprint.confirm' })}`}
                </Button>
              </span>
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddSettlementAuthority;
