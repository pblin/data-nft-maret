# Terraform


## init
terraform init

# environment for connecting to Azure RM
export ARM_SUBSCRIPTION_ID="replace with subscription id"
export ARM_CLIENT_ID="replace with client id"
export ARM_CLIENT_SECRET="replace with client secret"
export ARM_TENANT_ID="replace with tenant id"

## create plan
terraform plan -out [name of the plan]

## apply plan
terraform apply [name of the plan]

## destroy 
terraform destroy


