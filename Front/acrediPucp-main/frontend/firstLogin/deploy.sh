sudo systemctl stop nginx
echo "Building app..."
sudo rm -r build/*
npm run build
echo "Deploying files to Server..."
sudo rm -r /var/www/reactivos.inf.pucp.edu.pe/*
sudo cp -r build/* /var/www/reactivos.inf.pucp.edu.pe
echo "Done!"
sudo systemctl start nginx