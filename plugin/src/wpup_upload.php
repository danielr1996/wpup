<?php
add_action('rest_api_init', function () {
    register_rest_route('wpup/v1', '/upload', array(
        'methods' => 'POST',
        'callback' => function () {
            try {
                $theme_name = upload_theme();
                if (isset($_GET['activate'])) {
                    switch_theme($theme_name);
                }
                return array(
                    'status' => 'success',
                    'message' => $theme_name
                );
            } catch (Exception $exception) {
                return array(
                    'status' => 'error',
                    'message' => $exception->getMessage()
                );
            }
        },
        'permission_callback' => function () {
            return current_user_can('install_themes');
        }
    ));
});

function upload_theme()
{
    if (!($theme = $_FILES['theme'])) {
        throw new Exception("File with key 'theme' not found \$_FILES");
    }

    return unzip($theme['tmp_name']);
}


function unzip(string $zippath)
{
    $zip = new ZipArchive();
    if ($res = $zip->open($zippath)) {
        $target_directory = explode('/', $zip->statIndex(0)['name'])[0];
        removeDiretory(dirname(get_template_directory()) . '/' . $target_directory);
        $status = $zip->extractTo(dirname(get_template_directory()));
        $zip->close();
    } else {
        throw new Exception("zip $zippath could not be opened!");
    }
    return $target_directory;
}

function removeDiretory(string $dir)
{
    if (file_exists($dir)) {
        $it = new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS);
        $files = new RecursiveIteratorIterator($it,
            RecursiveIteratorIterator::CHILD_FIRST);
        foreach ($files as $file) {
            if ($file->isDir()) {
                rmdir($file->getRealPath());
            } else {
                unlink($file->getRealPath());
            }
        }
        rmdir($dir);
    }
}
