<?php
add_action('rest_api_init', function () {
    register_rest_route('wpup/v1', '/activate/(?P<theme>.+)', array(
        'methods' => 'POST',
        'args' => array(
            'theme' => array(
                'validate_callback' => function ($param) {
                    return file_exists(dirname(get_template_directory()) . '/' . $param);
                }
            )
        ),
        'callback' => function (WP_REST_Request $request) {
            try{
                switch_theme($request->get_param('theme'));
                return array('status'=>'success');
            }catch (Exception $exception){
                return array('status'=>'error','message'=>$exception->getMessage());
            }
        },
        'permission_callback' => function () {
            return current_user_can('switch_themes');
        }
    ));
});

