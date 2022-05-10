#!/bin/bash

 resourceGroup="Rebloc-MVP-Dev-2"
 imgName="$2"
 nsg="Rebloc-MVP-Dev-2-nsg"


az vm create \
   --resource-group ${resourceGroup} \
   --name $1 \
   --image ${imgName} \
   --admin-username reblocmvp \
   --nics  reblocImgTestVMNic \
   --size Standard_DC4s \
   --ssh-key-value ~/.ssh/reblocmvp.pub
