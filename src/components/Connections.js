import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppHeader from './AppHeader';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function Connections() {
  const [cloudProvider, setCloudProvider] = useState('aws');
  const [apiKey, setApiKey] = useState('');

  // AWS environment variables
  const [awsIncludeEstimates, setAwsIncludeEstimates] = useState(true);
  const [awsUseBillingData, setAwsUseBillingData] = useState(true);
  const [awsAthenaDbName, setAwsAthenaDbName] = useState('');
  const [awsAthenaDbTable, setAwsAthenaDbTable] = useState('');
  const [awsAthenaRegion, setAwsAthenaRegion] = useState('');
  const [awsAthenaQueryResultLocation, setAwsAthenaQueryResultLocation] = useState('');
  const [awsBillingAccountId, setAwsBillingAccountId] = useState('');
  const [awsBillingAccountName, setAwsBillingAccountName] = useState('');

  // Azure environment variables
  const [azureIncludeEstimates, setAzureIncludeEstimates] = useState(true);
  const [azureUseBillingData, setAzureUseBillingData] = useState(true);
  const [azureClientId, setAzureClientId] = useState('');
  const [azureClientSecret, setAzureClientSecret] = useState('');
  const [azureTenantId, setAzureTenantId] = useState('');

  const handleCloudProviderChange = (event, newProvider) => {
    setCloudProvider(newProvider);
  };

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  const handleAwsIncludeEstimatesChange = (event) => {
    setAwsIncludeEstimates(event.target.checked);
  };

  const handleAwsUseBillingDataChange = (event) => {
    setAwsUseBillingData(event.target.checked);
  };

  const handleAwsAthenaDbNameChange = (event) => {
    setAwsAthenaDbName(event.target.value);
  };

  const handleAwsAthenaDbTableChange = (event) => {
    setAwsAthenaDbTable(event.target.value);
  };

  const handleAwsAthenaRegionChange = (event) => {
    setAwsAthenaRegion(event.target.value);
  };

  const handleAwsAthenaQueryResultLocationChange = (event) => {
    setAwsAthenaQueryResultLocation(event.target.value);
  };

  const handleAwsBillingAccountIdChange = (event) => {
    setAwsBillingAccountId(event.target.value);
  };

  const handleAwsBillingAccountNameChange = (event) => {
    setAwsBillingAccountName(event.target.value);
  };

  const handleAzureIncludeEstimatesChange = (event) => {
    setAzureIncludeEstimates(event.target.checked);
  };

  const handleAzureUseBillingDataChange = (event) => {
    setAzureUseBillingData(event.target.checked);
  };

  const handleAzureClientIdChange = (event) => {
    setAzureClientId(event.target.value);
  };

  const handleAzureClientSecretChange = (event) => {
    setAzureClientSecret(event.target.value);
  };

  const handleAzureTenantIdChange = (event) => {
    setAzureTenantId(event.target.value);
  };

  const handleConnect = () => {
    // connection logic here...
  };

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <AppHeader />
      <Container maxWidth="sm" style={{ marginTop: 64, marginLeft: 'auto', marginRight: 'auto', padding: 20 }}>
        <h2>Connect to AWS and Azure</h2>
        <ToggleButtonGroup
          value={cloudProvider}
          exclusive
          onChange={handleCloudProviderChange}
          style={{ marginBottom: '1rem' }}
        >
          <ToggleButton value="aws">AWS</ToggleButton>
          <ToggleButton value="azure">Azure</ToggleButton>
        </ToggleButtonGroup>
        <form>
          <TextField
            label={`${cloudProvider === 'aws' ? 'AWS' : 'Azure'} API Key`}
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            value={apiKey}
            onChange={handleApiKeyChange}
          />

          {cloudProvider === 'aws' && (
            <>
              <TextField
                label="AWS Athena DB Name"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={awsAthenaDbName}
                onChange={handleAwsAthenaDbNameChange}
              />
              <TextField
                label="AWS Athena DB Table"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={awsAthenaDbTable}
                onChange={handleAwsAthenaDbTableChange}
              />
              <TextField
                label="AWS Athena Region"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={awsAthenaRegion}
                onChange={handleAwsAthenaRegionChange}
              />
              <TextField
                label="AWS Query Result Location"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={awsAthenaQueryResultLocation}
                onChange={handleAwsAthenaQueryResultLocationChange}
              />
              <TextField
                label="AWS Billing Account ID"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={awsBillingAccountId}
                onChange={handleAwsBillingAccountIdChange}
              />
              <TextField
                label="AWS Billing Account Name"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={awsBillingAccountName}
                onChange={handleAwsBillingAccountNameChange}
              />
            </>
          )}

          {cloudProvider === 'azure' && (
            <>
              <TextField
                label="Azure Client ID"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={azureClientId}
                onChange={handleAzureClientIdChange}
              />
              <TextField
                label="Azure Client Secret"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={azureClientSecret}
                onChange={handleAzureClientSecretChange}
              />
              <TextField
                label="Azure Tenant ID"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={azureTenantId}
                onChange={handleAzureTenantIdChange}
              />
            </>
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={cloudProvider === 'aws' ? awsIncludeEstimates : azureIncludeEstimates}
                onChange={cloudProvider === 'aws' ? handleAwsIncludeEstimatesChange : handleAzureIncludeEstimatesChange}
              />
            }
            label="Include Estimates"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={cloudProvider === 'aws' ? awsUseBillingData : azureUseBillingData}
                onChange={cloudProvider === 'aws' ? handleAwsUseBillingDataChange : handleAzureUseBillingDataChange}
              />
            }
            label="Use Billing Data"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleConnect}
            style={{ marginTop: '1rem' }}
          >
            Connect
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default Connections;
