
required_plugins = ["vagrant-hostsupdater"]
required_plugins.each do |plugin|
  exec "vagrant plugin install #{plugin}" unless Vagrant.has_plugin? plugin
end

Vagrant.configure("2") do |config|
 
  config.vm.box = "ubuntu/xenial64"
  config.vm.network "private_network", ip: "192.168.10.100"
  config.hostsupdater.aliases = ["development.local"]

  config.vm.synced_folder ".", "/home/ubuntu/app"

  config.vm.provision "shell", path: "environment/provision.sh", privileged: false
  
end
