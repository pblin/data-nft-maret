#!/bin/bash

resourceGroup="$1"
vmName="$2"
imgName="$3"

#deallocate VM
az vm deallocate \
  --resource-group ${resourceGroup} \
  --name ${vmName}

  az vm generalize \
  --resource-group ${resourceGroup} \
  --name ${vmName}

  az image create \
  --resource-group ${resourceGroup} \
  --name ${imgName} --source ${vmName}
