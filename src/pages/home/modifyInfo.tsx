import React from 'react';
import theme from '@/theme/colors';
import styled from '@emotion/styled';
import Layout from '@/common/components/Layout/Layout';
import ModifyInformation from '@/features/ModifyInformation/ModifyInformation';
import { useRouter } from 'next/router';
import ModifyPhoneNumber from '@/features/ModifyInformation/ModifyPhoneNumber';
import { isEmpty } from 'lodash';
import Header from '@/features/ModifyInformation/Header';
import ModifyAddress from '@/features/ModifyInformation/ModifyAddress';
import ModifyToken from '@/features/ModifyInformation/ModifyToken';

const ModifyInfoPage = () => {
  const router = useRouter();
  const query = router.query;

  return (
    <Layout>
      <Container>
        <Header />
        <Children>
          {isEmpty(query) && <ModifyInformation />}
          {query.menu === 'phoneNumber' && <ModifyPhoneNumber />}
          {query.menu === 'address' && <ModifyAddress />}
          {query.menu === 'workAddress' && <ModifyAddress />}
          {query.menu === 'token' && <ModifyToken />}
        </Children>
      </Container>
    </Layout>
  );
};

export default ModifyInfoPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Children = styled.div`
  background-color: ${theme.colors[1]};
  padding: 16px;
  position: relative;
  height: 100%;
  flex: 1;
  overflow-y: auto;
`;
