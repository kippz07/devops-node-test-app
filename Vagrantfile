
required_plugins = ["vagrant-hostsupdater", "vagrant-berkshelf"]
required_plugins.each do |plugin|
  exec "vagrant plugin install #{plugin}" unless Vagrant.has_plugin? plugin
end

Vagrant.configure("2") do |config|
 
  config.vm.define "app" do |app|
    app.vm.box = "ubuntu/xenial64"
    app.vm.network "private_network", ip: "192.168.10.100"
    app.hostsupdater.aliases = ["dev.local"]
    app.vm.synced_folder ".", "/home/ubuntu/app"
    # app.vm.provision "shell", path: "environment/box_app/provision.sh", privileged: false
    app.vm.provision "chef_solo" do |chef|
      chef.cookbooks_path = ['cookbooks']
      chef.run_list = ['recipe[node-server::default]']
    end
    app.vm.provision "shell", inline: "echo 'export DB_HOST=mongodb://192.168.10.101/test' >> .bash_profile"
  end

  config.vm.define "db" do |db|
    db.vm.box = "ubuntu/xenial64"
    db.vm.network "private_network", ip: "192.168.10.101"
    db.hostsupdater.aliases = ["db.local"]
    db.vm.synced_folder "./environment", "/home/ubuntu/app/environment"
    db.vm.provision "shell", path: "environment/box_db/provision.sh", privileged: false
  end
end
