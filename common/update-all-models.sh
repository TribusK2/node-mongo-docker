while test $# -gt 0; do
    case "$1" in
        -f|--force)
            read -p "This will delete all shared apps models and save the version from the common folder in their place. Continue? [y/n]" yn
            case $yn in
                [Yy]* ) 
                    # Override backend model
                    rm -Rv ../backend/model/
                    cp -TRv ./model ../backend/model

                    # Override frontend model
                    rm -Rv ../frontend/model/
                    cp -TRv ./model ../frontend/model
                    exit 0;;
                [Nn]* ) exit 0;;
                * ) echo "Please answer yes or no";;
            esac
        ;;
        -h|--help)
            echo "options:"
            echo "-h, --help    show brief help"
            echo "-f, --force   override all apps models"
            exit 0
        ;;
        *)
            echo "No such argument '$1'"
            echo "Use -h or --help argument to show brief help"
            exit 1
        ;;
    esac
done

# Update backend model with files and folders from common model
cp -TRv ./model ../backend/model

# Update frontend model with files and folders from common model
cp -TRv ./model ../frontend/model
