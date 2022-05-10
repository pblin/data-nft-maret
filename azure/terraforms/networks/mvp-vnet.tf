# Create a Virtual Network within the Resource Group
resource "azurerm_virtual_network" "mvpapp" {
  name                = "Rebloc-App-VNet"
  address_space       = ["10.1.0.0/16"]
  resource_group_name = "Rebloc-MVP-Dev"
  location            = "eastus"
}

resource "azurerm_subnet" "appsubnet" {
  name                 = "Rebloc-App-Subet"
  virtual_network_name = "${azurerm_virtual_network.mvpapp.name}"
  resource_group_name  = "Rebloc-MVP-Dev"
  address_prefix       = "10.1.0.0/16"
}

# Create a Public IP for the Virtual Machine
resource "azurerm_public_ip" "appvm" {
  name                         = "app-vm-ip"
  location                     = "eastus"
  resource_group_name          = "Rebloc-MVP-Dev"
  public_ip_address_allocation = "dynamic"
}

resource "azurerm_network_interface" "ext-nic" {
  name                      = "Rebloc-App-Nic"
  location                  = "eastus"
  resource_group_name       = "Rebloc-MVP-Dev"
  network_security_group_id = "${azurerm_network_security_group.nsg.id}"

  tags = {
    name = "mvp:nics"
  }

  ip_configuration {
    name                          = "primary"
    subnet_id                     = "${azurerm_subnet.appsubnet.id}"
    private_ip_address_allocation = "dynamic"
    public_ip_address_id          = "${azurerm_public_ip.appvm.id}"
  }
}

resource "azurerm_network_security_group" "nsg" {
  name                = "Rebloc-App-nsg"
  location            = "eastus"
  resource_group_name = "Rebloc-MVP-Dev"

  tags = {
    name = "mvp:netSecGrp"
  }

  security_rule {
    name                       = "Port_22"
    description                = ""
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "*"
    source_address_prefix      = "*"
    source_port_range          = "*"
    destination_address_prefix = "*"
    destination_port_range     = "22"
  }

  security_rule {
    name                       = "Port_SSH"
    description                = ""
    priority                   = 100
    direction                  = "Outbound"
    access                     = "Allow"
    protocol                   = "*"
    source_address_prefix      = "*"
    source_port_range          = "*"
    destination_address_prefix = "*"
    destination_port_range     = "22"
  }

  security_rule {
    name                       = "Port_apps"
    description                = ""
    priority                   = 110
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "TCP"
    source_address_prefix      = "*"
    source_port_range          = "*"
    destination_address_prefix = "*"
    destination_port_range     = "8081-8089"
  }

  security_rule {
    name                       = "Port_8545"
    description                = ""
    priority                   = 120
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "TCP"
    source_address_prefix      = "*"
    source_port_range          = "*"
    destination_address_prefix = "*"
    destination_port_range     = "8545"
  }

  security_rule {
    name                       = "Port_Demo"
    description                = ""
    priority                   = 130
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "TCP"
    source_address_prefix      = "*"
    source_port_range          = "*"
    destination_address_prefix = "*"
    destination_port_range     = "3000-3005"
  }
}
